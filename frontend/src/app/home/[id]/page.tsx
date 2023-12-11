"use client"

import { IGetMusics } from "@/components/cards"
import { SwalAlert } from "@/components/sweetalert"
import api from "@/services/api"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Swal from "sweetalert2"


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
        api.get(`/music/${params.id}`).then((res) => {
            setDataGet(res.data)
        })
    },[])

    const { push } = useRouter();

    async function handleDownload() {
        try {
            if (dataGet.musicAsAudio) {
                window.open(dataGet.musicAsAudio)
            }
        } catch (error) {
            toast.error("Erro");
        }
    }

    function deleteMusic(){
        SwalAlert({
            title: "Deseja realmente apagar essa música?"
        }).then((res) => {
            if(res.isConfirmed){
                api.delete(`/music/${params.id}`).then((res) => {
                    push("/home")
                    toast.success("Música apagada com sucesso!")
                })
            }
        })
    }
    
    return (
        <div className="w-full text-white flex items-center flex-col my-4 gap-2 ">
            <p className="text-3xl font-bold">{dataGet?.nome}</p>
            <p className="text-2xl">Cantor: {dataGet?.cantor}</p>
            <Link href={dataGet.link} className="text-xl ">Acessar música na plataforma original</Link>
            <div className="relative w-96 h-96 z-20">
                {dataGet.capa ? <Image src={dataGet.capa} fill className="object-cover" alt={dataGet.nome}/> : null}
            </div>

            <button onClick={() => handleDownload()} className="text-xl">Converter para MP3</button>
            <button type="button" className="text-xl text-customRed bg-white p-2 rounded-md font-bold" onClick={deleteMusic}>
                Deletar música
            </button>
        </div>
    )
}