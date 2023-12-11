import Image from "next/image";
import { MouseEvent } from "react";
import { AiFillStar, AiOutlineDownload, AiOutlineStar } from "react-icons/ai";

export interface IGetMusics {
    capa: string
    nome: string,
    link: string,
    cantor: string,
    id: string,
    musicAsAudio? : string
    favorito: boolean
}

interface IProps extends IGetMusics {
    onClickFavorite: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void;
    onClickRedirect: () => void;
}

export function MusicCard(props: IProps){
    
    return(
        <div 
            className="flex flex-col justify-center bg-lowBlack rounded-md p-4 text-white gap-2 shadow-cards relative cursor-pointer" 
            onClick={props.onClickRedirect}
        >
            <div className="absolute top-2 right-2 animate hover:scale-110 cursor-pointer" onClick={(e) => {props.onClickFavorite(e)}} >
                {props.favorito ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
            </div>
            <div className="flex justify-center">
                <Image src={props.capa} alt={props.nome} className="rounded-md" width={200} height={200}  />
            </div>
            <p className="">{props.nome}</p>
            <p className="text-sm text-[#B3B3B3] flex gap-2 items-center cursor-pointer">Baixar música (mp3) <AiOutlineDownload /></p>
        </div>
    )
}

interface SearchCardProps {
    item: IGetMusics
    onClickRedirect: () => void;
    onClickFavorite: (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => void;
}

export function SearchCard(props: SearchCardProps){
    return (
        <div 
            className="text-white w-full p-3 border-2 border-white rounded-md cursor-pointer" 
            onClick={props.onClickRedirect}>
            <div className="flex flex-row justify-between items-center">
                <p className="font-bold">{props.item.nome}</p>
                <span 
                    onClick={(e) => {props.onClickFavorite(e)}}
                    className="animate hover:scale-110"
                >
                    {props.item.favorito ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
                </span>
            </div>
            <p>{props.item.cantor}</p>
        </div>
    )
}