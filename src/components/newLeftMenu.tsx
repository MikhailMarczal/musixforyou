import { AiFillHome, AiFillPlusSquare, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import Logo from "../../public/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants";

function LeftMenu() {
    return (
        <div className="relative bg-mediumBlack w-full xsm:w-[350px] min-h-screen px-4 sm:px-5 py-6 text-white font-bold overflow-y-auto">
            <div className="grid grid-cols-1 gap-8 text-lg font-medium">
                <Link className="flex justify-center" href={ROUTES.HOME}>
                    <Image src={Logo} alt="Logotipo" className="w-[60%]" />
                </Link>

                <div className="flex flex-col gap-4">
                    <Link className="flex gap-4 items-center" href={ROUTES.HOME}>
                        <AiFillHome color="white" size={28} />
                        Página Inicial
                    </Link>
                    <Link className="flex gap-4 items-center" href={ROUTES.SEARCH_MUSICS} >
                        <AiOutlineSearch color="white" size={28}  />
                        Pesquisar
                    </Link>
                </div>
                <div className="flex flex-col gap-4">
                    <Link className="flex gap-4 items-center" href={ROUTES.ADD_MUSIC} >
                        <AiFillPlusSquare color="white" size={28}  />
                        Adicionar Música
                    </Link>
                    <Link className="flex gap-4 items-center" href={ROUTES.FAVORITE_MUSICS}>
                        <AiOutlineHeart color="white" size={28}  />
                        Músicas favoritas
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;
