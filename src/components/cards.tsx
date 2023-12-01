import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { AiOutlineDownload } from "react-icons/ai";

export interface IGetMusics {
    anexo: string | StaticImageData
    nome: string,
    link: string,
    cantor: string,
    id: string
}

interface IProps extends IGetMusics {
    redirect: string
}

export function MusicCard(props: IProps){
    return(
        <Link className="flex flex-col justify-center bg-lowBlack rounded-md p-4 text-white gap-2 shadow-cards" href={props.redirect}>
            <div className="flex justify-center">
                {/* <Image src={props.anexo} alt={props.titulo} className="rounded-md" width={200} height={200}/> */}
            </div>
            <p className="">{props.nome}</p>
            <p className="text-sm text-[#B3B3B3] flex gap-2 items-center cursor-pointer">Baixar música (mp3) <AiOutlineDownload /></p>
        </Link>
    )
}