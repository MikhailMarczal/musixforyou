"use client"

import { IGetMusics, MusicCard } from "@/components/cards"
import api from "@/services/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ClientMasonry from "../masonry"

export default function Favoritos(){

    const [favorites, setFavorites] = useState<IGetMusics[]>()
    const { push } = useRouter()


    useEffect(() => {
        api.get("/music/favorite").then((res) => {
            setFavorites(res.data)
        })
    },[])

    return(
        <div>
            <p className="text-2xl font-bold text-white text-center my-8">Músicas favoritas</p>
            
            <ClientMasonry
                columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
                spacing={1.5}
                className="mx-auto"
            >
                <>
                    {favorites?.map((item) => (
                        <MusicCard
                            {...item}
                            key={item.nome + item.id}
                            onClickFavorite={(e) => {
                                e.stopPropagation()
                            }}
                            onClickRedirect={() => push(`/home/${item.id}`)}
                        />
                    ))}
                </>
            </ClientMasonry>
        </div>
    )
}