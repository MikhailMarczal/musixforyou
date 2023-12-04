import { IGetMusics, MusicCard } from "@/components/cards";

import { getMusics } from "../actions/getAllMusics";
import ClientMasonry from "./masonry";
import axios from "axios";

export default async function HomePage() {


    const response = await axios.get("http://localhost:3000/music/getAll")
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
