"use server"

import { IPostMusic } from "@/interfaces";
import { client } from "@/lib/db";
const { v4: uuid } = require("uuid")

export async function createMusic(dataPost: IPostMusic){
    
    console.log(dataPost)
    //criar id unico
    const uniqueId = uuid()


    await client.zAdd("musics", {
        value: String(uniqueId),
        score: Date.now()
    })

    //salvar hash da musica
    await client.hSet(`music:${uniqueId}`, {
        nome: dataPost.nome,
        link: dataPost.link,
        cantor: dataPost.cantor,
        /* capa: ? */
    })

}