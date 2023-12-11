const client = require("../db")
const fs = require("fs")
const ytdl = require("ytdl-core");
const repository = require("../repository");
const { EntityId } = require("redis-om");

exports.create = async (req, res) => {
    const videoUrl = req.body.link

    const isVideoUrlValid = ytdl.validateURL(videoUrl)
    
    try {
        const date = Date.now()

        const videoInfo = await ytdl.getInfo(videoUrl)
        const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly")
        
        var musicAsAudio
        audioFormats.map((item) => {
            musicAsAudio = item.url
        })

        const data = {
            nome: req.body.nome,
            cantor: req.body.cantor,
            link: req.body.link,
            musicAsAudio: musicAsAudio,
            capa: `http://localhost:3000/${req.file.path}`,
            favorito: false,
        }
        
        const music = await repository.save(data)

        music.id = music[EntityId]

        await repository.save(music)

        return res.status(200).json({id: `${music[EntityId]}`})

    } catch (error) {
        if (fs.existsSync(req.file.path)){
            fs.unlinkSync(req.file.path)
        }
        if(!isVideoUrlValid){
            return res.status(400).json({msg: "Link para a música inválido"})
        }
        res.status(500).json({message: "Erro ao salvar musica, verifique se os dados estão inseridos corretamente"})
            
    }
}



exports.findAll = async (req, res) => {
    try {
        const musics = await repository.search().return.all()
    
        res.json(musics);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar músicas" });
    }
}

exports.getOne = async (req, res) => {
    try {
        const music = await repository.fetch(req.params.id)
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
        
        const music = await repository.fetch(id)
        
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

        await repository.remove(id)

        res.status(200).json({message: "DEU GOOD"})

    } catch (error) {
        res.status(500).json({message: "Erro ao excluir musica"})
    }
}

exports.getSearch = async (req, res) => {
    const searchParams = req.params.search
    try {
        const musics = await repository.search()
            .where('nome').matches(`*${searchParams}*`)
            .or('cantor').matches(`*${searchParams}*`)
            .return.all()

            res.json(musics)

    } catch (error) {
        console.log(error);
    }
}

exports.favorite = async (req, res) => {
    try {
        const id = req.params.id

        const fetch = await repository.fetch(id)
        if(!fetch.id){
            return res.status(400).json({message: "Id não encontrado"})
        }

        fetch.favorito = !fetch.favorito

        await repository.save(fetch)

        res.status(200).json({message: "Sucesso"})

    } catch (error) {
        res.status(400).json({msg: "Erro ao editar"})
    }
}