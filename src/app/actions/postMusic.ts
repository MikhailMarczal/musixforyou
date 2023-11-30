"use server"

import { IPostMusic } from "@/interfaces";
import { client } from "@/lib/db";
const { v4: uuid } = require("uuid")

export async function createMusic(dataPost: IPostMusic){
    
    //criar id unico
    const uniqueId = uuid()


    const unique = await client.zAdd("musics", {
        value: dataPost.nome,
        score: uniqueId
    })

    //salvar hash da musica
    await client.hSet(`musics:${uniqueId},`, {
        nome: dataPost.nome,
        link: dataPost.link,
        cantor: dataPost.cantor
    })

}