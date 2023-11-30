"use client"
import { IGetMusics, MusicCard } from "@/components/cards";
import primeira from "../../../public/primeira.png";
import LeftMenu from "@/components/newLeftMenu";
import Navbar from "@/components/Navbar";
import { Masonry } from "@mui/lab";
import { useEffect, useState } from "react";
import LeftMenuSmallWindows from "@/components/leftMenu";

export default function HomePage() {
  const InfoArray: IGetMusics[] = [
    { id: 1, anexo: primeira, titulo: "Primeira" },
    { id: 2, anexo: primeira, titulo: "Primeira" },
    { id: 3, anexo: primeira, titulo: "Primeira" },
    { id: 4, anexo: primeira, titulo: "Primeira" },
    { id: 5, anexo: primeira, titulo: "Primeira" },
    { id: 6, anexo: primeira, titulo: "Primeira" },
  ];

  

    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        if (typeof window !== 'undefined') {
            setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        }
    }, []);

    const windowMd = windowWidth > 768


  return (
    <div className="">
            <Masonry
                columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
                spacing={1.5}
                className="justify-center pt-1 px-4"
            >
                {InfoArray.map((item) => (
                    <MusicCard
                        anexo={item.anexo}
                        titulo={item.titulo}
                        id={item.id}
                        key={item.id + "a"}
                        redirect={`/home/${item.id}`}
                    />
                ))}
            </Masonry>
    </div>
  );
}
