"use client"

import { IGetMusics } from "@/components/cards"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


export default function MusicPage({ params } : { params: { id: string }}){
    const [dataGet, setDataGet] = useState<IGetMusics>({
        cantor: "",
        capa: "",
        id: "",
        link: "",
        nome: "",
        favorito: false
    })
    useEffect(() => {
        axios.get(`http://localhost:3000/music/${params.id}`).then((res) => {
            setDataGet(res.data)
        })
    },[])


    async function handleDownload() {
        try {
            if (dataGet.musicAsAudio) {
                window.open(dataGet.musicAsAudio)
            }
        } catch (error) {
            toast.error("Erro");
        }
    }
    
    return (
        <div className="w-full text-white flex items-center flex-col my-4 gap-2 ">
            <p className="text-3xl font-bold">{dataGet?.nome}</p>
            <p className="text-2xl">Cantor: {dataGet?.cantor}</p>

            <div className="relative w-96 h-96 z-20">
                <Image src={dataGet.capa} fill className="object-cover" alt={dataGet.nome}/>
            </div>

            <Link href={dataGet.link} className="text-xl ">Visualizar link da música</Link>
            <button onClick={() => handleDownload()}>Converter para MP3</button>
        </div>
    )
}