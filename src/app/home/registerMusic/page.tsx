"use client"
import { createMusic } from "@/app/actions/postMusic";
import { Button, Input, InputImage } from "@/components/inputs";
import { TYPE_ACCEPT_IMAGES } from "@/constants";
import { IPostMusic } from "@/interfaces";
import { ChangeEvent, useState } from "react";

export default function RegisterMusic(){

    const [dataPostMusic, setDataPostMusic] = useState<IPostMusic>({
        nome: "",
        link: "",
        cantor: "",
        capa: undefined
    })


    function handleImages(files: FileList){

        if(files.length){
            setDataPostMusic(old => ({...old, capa: files[0]}))
        }
    }

    function clickRemoveCapa(){
        setDataPostMusic(old => ({...old, capa: undefined}))
    }

    function postMusic(){
        createMusic(dataPostMusic)
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
                <InputImage 
                    handleImages={(evt) => handleImages(evt)} 
                    acceptedFiles={TYPE_ACCEPT_IMAGES} 
                    capa={dataPostMusic.capa}
                    clickRemoveCapa={clickRemoveCapa}
                />
                <Button size="small" text="Enviar música" type="button" width="full" className="text-white font-bold" onClick={() => postMusic()}/>
                
            </form>
        </div>
    )
}