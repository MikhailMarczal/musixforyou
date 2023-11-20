import { AiFillHome, AiFillPlusSquare, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import Logo from "../../public/Logo.png";
import Image from "next/image";

function LeftMenu() {
    return (
        <div className="relative bg-black w-full xsm:w-[350px] min-h-screen px-4 sm:px-5 py-4 text-white font-bold overflow-y-auto">
            <div className="grid grid-cols-1 gap-8 text-lg font-medium">
                <div className="flex justify-center">
                    <Image src={Logo} alt="Logotipo" className="w-[60%]" />
                </div>

                <div className="flex flex-col gap-4">
                    <span className="flex gap-4 items-center">
                        <AiFillHome color="white" size={28} />
                        Página Inicial
                    </span>
                    <span className="flex gap-4 items-center" >
                        <AiOutlineSearch color="white" size={28}  />
                        Pesquisar
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="flex gap-4 items-center" >
                        <AiFillPlusSquare color="white" size={28}  />
                        Adicionar Música
                    </span>
                    <span className="flex gap-4 items-center" >
                        <AiOutlineHeart color="white" size={28}  />
                        Músicas favoritas
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;
