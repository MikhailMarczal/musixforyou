import Image, { StaticImageData } from "next/image";
import { AiOutlineDownload } from "react-icons/ai";

export interface IGetMusics {
    id: Number
    anexo: string | StaticImageData
    titulo: string
}

interface IProps extends IGetMusics {
    onClickDownload: () => void
}

export function MusicCard(props: IProps){
    return(
        <div className="flex flex-col justify-center bg-[#161616] rounded-md p-4 text-white gap-2 shadow-cards">
            <div className="flex justify-center">
                <Image src={props.anexo} alt={props.titulo} className="rounded-md" width={200} height={200}/>
            </div>
            <p className="">{props.titulo}</p>
            <p className="text-sm text-[#B3B3B3] flex gap-2 items-center cursor-pointer" onClick={props.onClickDownload}>Baixar música (mp3) <AiOutlineDownload /></p>
        </div>
    )
}