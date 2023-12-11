"use client"
import Navbar from "@/components/Navbar"
import LeftMenuSmallWindows from "@/components/leftMenu";
import LeftMenu from "@/components/newLeftMenu";
import { usePlayer } from "@/context";
import { useEffect, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
//import 'react-h5-audio-player/lib/styles.css';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [windowWidth, setWindowWidth] = useState(0);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)

    const { playingMusic } = usePlayer()

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
        <div className="flex overflow-hidden z-50">
        {windowMd ? <LeftMenu /> : (
            isLeftMenuOpen ? <LeftMenuSmallWindows onClickOut={() => setIsLeftMenuOpen(false)} handleIsLeftMenuOpen={() => setIsLeftMenuOpen(old => !old)} /> : null
        )}
        <main className="min-h-screen flex flex-col justify-between w-full bg-gradient-to-b from-mediumBlack via-[#202020] via-30% to-[#0B5EAA]/80">
            <div>
            <Navbar windowMd={windowMd} handleLeftMenu={() => setIsLeftMenuOpen(old => !old)}/>
                {children}
            </div>
                {playingMusic.music ? (
                    <div className="flex flex-col bg-lowBlack ">
                        <p className="p-2 text-white"><b className="text-[#0B5EAA]">Tocando agora:</b> {playingMusic.name}</p>
                        <AudioPlayer
                            autoPlay
                            src={playingMusic.music}
                            onPlay={e => console.log("onPlay")}
                            
                            autoPlayAfterSrcChange={false}
                        />
                    </div>
                ) : null}
                
        </main>
        
    </div>
    )
}