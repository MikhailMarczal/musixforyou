"use client"

import MusicPlayer from "@/components/musicplayer"


export default function MusicPage({ params } : { params: { id: string }}){

    return (
        <div className="bg-mediumBlack w-full min-h-screen">
            {params.id}
        </div>
    )
}