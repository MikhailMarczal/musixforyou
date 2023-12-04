const { v4: uuid } = require("uuid")
const client = require("../db")
const fs = require("fs")
const ytdl = require("ytdl-core");

exports.create = async (req, res) => {
    const uniqueId = uuid()

    try {
        
        const { name } = req.body

        const { file } = req.file

        const picture = {
            name,
            src: file
        }
        
        const date = Date.now()

        const videoUrl = req.body.link
        const videoInfo = await ytdl.getInfo(videoUrl)
        const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly")

        var musicAsAudio
        audioFormats.map((item) => {
            musicAsAudio = item.url
        })

        await client.hSet(`music:${uniqueId}`, {
            id: uniqueId,
            nome: req.body.nome,
            link: req.body.link,
            cantor: req.body.cantor,
            musicAsAudio: musicAsAudio, 
            capa: `http://localhost:3000/${req.file.path}`
        })

        await client.zAdd("musics", {
            value: String(uniqueId),
            score: date
        })

        res.json({picture, msg: "Musica salva com sucesso!"})

    } catch (error) {
        res.status(500).json({message: "Erro ao salvar musica"})
        console.log(error);
    }
}



exports.findAll = async (req, res) => {
    try {
        const result = await client.zRangeWithScores('musics', 0, -1)
    
        const musics = await Promise.all(result.map(async (item) => {
            const musicData = await client.hGetAll(`music:${item.value}`)
            return musicData
        }))
    
        res.json(musics);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar músicas" });
    }
}

exports.getOne = async (req, res) => {
    try {
        
        const music = await client.hGetAll(`music:${req.params.id}`)

        if (!music.nome){
            return res.status(404).json({message: "Erro ao encontrar musica"})
        }

        res.json(music)

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar música" });
    }
}


exports.remove = async (req,res) => {
    try {
        
        const id = req.params.id
        
        const music = await client.hGetAll(`music:${id}`)
        
        if(!music.nome) {
            return res.status(404).json({message: "musica nao encontrada"})
        }

        const parts = music.capa.split("/")

        const uploadsIndex = parts.indexOf("uploads")

        const newPath = parts.slice(uploadsIndex).join("/")
        
        if (fs.existsSync(newPath)){
            fs.unlinkSync(newPath)
        } else {
            return res.status(404).json({message: "Erro ao encontrar capa da musica"})
        }

        await client.del(`music:${id}`)

        await client.zRem(`musics`, music.id)

        res.status(200).json({message: "DEU GOOD"})

    } catch (error) {
        res.status(500).json({message: "Erro ao excluir musica"})
    }
}