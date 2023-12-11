"use client"
import { IGetMusics, MusicCard } from "@/components/cards";

import ClientMasonry from "./masonry";
import api from "@/services/api";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [musics, setMusics] = useState<IGetMusics[]>()

    useEffect(() => {
        api.get("/music/getAll").then((res) => {
            setMusics(res.data)
        })
    },[])

    
    
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
                        redirect={`/home/${item.id}`}
                    />
                ))}
            </>
        </ClientMasonry>
    );
}
