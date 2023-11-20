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

  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0));  

  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)

  useEffect(() => {
    if(typeof window !== "undefined"){
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
    
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }
    
  }, [])

  const windowMd = windowWidth > 768

  return (
    <div className="flex">
        {windowMd ? <LeftMenu /> : (
            isLeftMenuOpen ? <LeftMenuSmallWindows onClickOut={() => setIsLeftMenuOpen(false)} handleIsLeftMenuOpen={() => setIsLeftMenuOpen(old => !old)} /> : null
        )}
        <main className="min-h-screen w-full bg-gradient-to-b from-[#111111] via-[#202020] via-30% to-[#0B5EAA]/80">
            <Navbar  windowMd={windowMd} handleLeftMenu={() => setIsLeftMenuOpen(old => !old)}/>
            <div className="flex gap-4 p-4">
                <Masonry
                    columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
                    spacing={1.5}
                >
                    {InfoArray.map((item) => (
                        <MusicCard
                            anexo={item.anexo}
                            titulo={item.titulo}
                            id={item.id}
                            key={item.id + "a"}
                            onClickDownload={() => console.log(`Download ${item.titulo}`)}
                        />
                    ))}
                </Masonry>
            </div>
        </main>
    </div>
  );
}
