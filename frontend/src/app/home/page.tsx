"use client"
import { IGetMusics, MusicCard } from "@/components/cards";

import ClientMasonry from "./masonry";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const [musics, setMusics] = useState<IGetMusics[]>()

    useEffect(() => {
        api.get("/music/getAll").then((res) => {
            setMusics(res.data)
        })
    },[])

    const { push } = useRouter();

    function favorite(id: string){
        api.patch(`/music/favorite/${id}`)

        if(musics && musics.length > 0){
            const copyArray = musics.slice()

            const index = copyArray.findIndex((item) => item.id == id)

            copyArray[index].favorito = !musics[index].favorito
            
            setMusics(copyArray)
        }
    }
    
    return (
        <ClientMasonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
            spacing={1.5}
            className="mx-auto"
        >
            <>
                {musics?.map((item) => (
                    <MusicCard
                        {...item}
                        key={item.nome + item.id}
                        onClickFavorite={(e) => {
                            e.stopPropagation()
                            favorite(item.id)
                        }}
                        onClickRedirect={() => push(`/home/${item.id}`)}
                    />
                ))}
            </>
        </ClientMasonry>
    );
}
