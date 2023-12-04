import { IGetMusics, MusicCard } from "@/components/cards";
import primeira from "../../../public/primeira.png";
import { Masonry } from "@mui/lab";
import { getMusics } from "../actions/getAllMusics";
import ClientMasonry from "./masonry";

export default async function HomePage() {

    const musics = await getMusics()
    
    return (
        <ClientMasonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
            spacing={1.5}
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
