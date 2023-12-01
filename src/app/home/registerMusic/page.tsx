"use client"
import { createMusic } from "@/app/actions/postMusic";
import { AnimatedButton, Button, Input, InputImage } from "@/components/inputs";
import { TYPE_ACCEPT_IMAGES } from "@/constants";
import { IPostMusic } from "@/interfaces";
import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function RegisterMusic(){

    const [dataPostMusic, setDataPostMusic] = useState<IPostMusic>({
        nome: "",
        link: "",
        cantor: "",
    })
    const [selectedImage, setSelectedImage] = useState("")
    const [selectedFile, setSelectedFile] = useState<File>()
    const [isUploading, setIsUploading] = useState(false)


    function handleImages(files: FileList){

        if(files.length){
            setDataPostMusic(old => ({...old, capa: files[0]}))
        }
    }

    function clickRemoveCapa(){
        //setSelectedImage()
    }

    const handleUpload = async () => {
        setIsUploading(true);
        
        try {
            if(!selectedFile) return
            
            const formData = new FormData() 
            
            /* formData.append("nome", dataPostMusic.nome)
            formData.append("cantor", dataPostMusic.cantor)
            formData.append("link", dataPostMusic.link) */
            formData.append("capa", selectedFile)

            const { data } = await axios.post("/app/api/image", formData)
            console.log(data)

        } catch(error : any){
            console.log(error.response?.data)
        }
        setIsUploading(false)
    }
    
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-white text-center">Cadastrar Música</h1>
            <form className="flex flex-col gap-4">
                <Input 
                    type="text" 
                    placeholder="Nome da música" 
                    value={dataPostMusic.nome} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataPostMusic(old => ({...old, nome: e.target.value}))} 
                />
                <Input 
                    type="text" 
                    placeholder="Link da música" 
                    value={dataPostMusic.link} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataPostMusic(old => ({...old, link: e.target.value}))} 
                />
                <Input 
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
                            setSelectedImage(URL.createObjectURL(file))
                            setSelectedFile(file)
                        }
                    }} 
                    acceptedFiles={TYPE_ACCEPT_IMAGES} 
                    capa={dataPostMusic.capa}
                    clickRemoveCapa={clickRemoveCapa}
                />
                <AnimatedButton  onClick={handleUpload} text="Enviar música" />
                
            </form>
        </div>
    )
}