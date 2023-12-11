"use client"

import { ReactNode, createContext, useContext, useState } from "react";

interface IContext {
    playingMusic: {
        music: string,
        name: string
    },
    setMusic: (music: IContext["playingMusic"]) => void
}

const PlayerContext = createContext<IContext>({} as IContext);

export const usePlayer = () => useContext(PlayerContext)

interface IProps {
    children: ReactNode
}

export function PlayerContextProvider(props: IProps){

    const [playingMusic, setPlayingMusic] = useState({
        music: "",
        name: ""
    })

    const setMusic = (music: IContext["playingMusic"]) => {
        setPlayingMusic(music)
    }

    return(
        <PlayerContext.Provider 
            value={{
                playingMusic,
                setMusic
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}