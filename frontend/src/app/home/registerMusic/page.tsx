"use client"
import { createMusic } from "@/app/actions/postMusic";
import { AnimatedButton, Button, InputImage } from "@/components/inputs";
import { PatternInput } from "@/components/patternComponents/inputs";
import { TYPE_ACCEPT_IMAGES } from "@/constants";
import { IPostMusic } from "@/interfaces";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function RegisterMusic(){

    const [dataPostMusic, setDataPostMusic] = useState<IPostMusic>({
        nome: "",
        link: "",
        cantor: "",
        capa: undefined
    })
    
    const [isUploading, setIsUploading] = useState(false)

    function clickRemoveCapa(){
        setDataPostMusic(old => ({...old, capa: undefined}))
    }

    const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
        setIsUploading(true);
        e.preventDefault()
        try {
            if(!dataPostMusic.capa) return
            
            const formData = new FormData() 
            
            formData.append("nome", dataPostMusic.nome)
            formData.append("cantor", dataPostMusic.cantor)
            formData.append("link", dataPostMusic.link)
            formData.append("file", dataPostMusic.capa)

            await axios.post("http://localhost:3000/music/create", formData)
            
        } catch(error : any){
            toast.error(error.response?.data.message)
        }
        setIsUploading(false)
    }
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-white text-center">Cadastrar Música</h1>
            <form className="flex flex-col gap-4" onSubmit={(e) => handleUpload(e)}>
                <PatternInput.Root
                    type="text" 
                    placeholder="Nome da música" 
                    value={dataPostMusic.nome} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataPostMusic(old => ({...old, nome: e.target.value}))} 
                />
                <PatternInput.Root
                    type="text" 
                    placeholder="Link da música" 
                    value={dataPostMusic.link} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataPostMusic(old => ({...old, link: e.target.value}))} 
                />
                <PatternInput.Root
                    type="text" 
                    placeholder="Cantor" 
                    value={dataPostMusic.cantor} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataPostMusic(old => ({...old, cantor: e.target.value}))} 
                />
                <p className="text-white text-lg -mb-2">Capa</p>
                <InputImage 
                    handleImages={(e) => {
                        if(e.target?.files.length > 0) {
                            const file = e.target?.files[0]
                            setDataPostMusic(old => ({...old, capa: file}))
                        }
                    }} 
                    acceptedFiles={TYPE_ACCEPT_IMAGES} 
                    capa={dataPostMusic.capa}
                    clickRemoveCapa={clickRemoveCapa}
                />
                <AnimatedButton type="submit" text="Enviar música" />
                
            </form>
        </div>
    )
}