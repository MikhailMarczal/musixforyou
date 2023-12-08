import { IGetMusics, MusicCard } from "@/components/cards";

import { getMusics } from "../actions/getAllMusics";
import ClientMasonry from "./masonry";
import axios from "axios";
import api from "@/services/api";

export default async function HomePage() {


    const response = await api.get("/music/getAll")
    const musics: IGetMusics[] = response.data
    
    return (
        <ClientMasonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
            spacing={1.5}
            className="mx-auto"
        >
            {musics.map((item) => (
                <MusicCard
                    {...item}
                    key={item.nome + item.cantor}
                    redirect={`/home/${item.id}`}
                />
            ))}
        </ClientMasonry>
    );
}
