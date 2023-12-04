"use client"
import Navbar from "@/components/Navbar"
import LeftMenuSmallWindows from "@/components/leftMenu";
import LeftMenu from "@/components/newLeftMenu";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [windowWidth, setWindowWidth] = useState(0);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false)

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
        <main className="min-h-screen w-full bg-gradient-to-b from-mediumBlack via-[#202020] via-30% to-[#0B5EAA]/80">
            <Navbar  windowMd={windowMd} handleLeftMenu={() => setIsLeftMenuOpen(old => !old)}/>
            {children}
        </main>
    </div>
    )
}