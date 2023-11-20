import Logo from "../../public/Logo.png";
import Image from "next/image";
import { BiX } from "react-icons/bi";

import { motion } from "framer-motion";
import {
  AiFillHome,
  AiFillPlusSquare,
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
interface ILeftMenu {
  handleIsLeftMenuOpen: () => void;
  onClickOut: () => void;
}

const SlideInLeft = {
  hidden: {
    x: "-350px",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "-350px",
    opacity: 0,
  },
};

function LeftMenuSmallWindows(props: ILeftMenu) {
    return (
        <div className="w-full h-screen fixed bg-transparent z-60">
            <motion.div
                variants={SlideInLeft}
                initial="hidden"
                animate="visible"
                exit={{ x: "-350px" }}
                className="bg-black w-full xsm:w-[350px] h-screen fixed left-0 top-0 z-70 px-4 sm:px-5 py-4 text-white font-bold overflow-y-auto"
            >
                <BiX
                size={50}
                color="white"
                onClick={props.handleIsLeftMenuOpen}
                className="cursor-pointer mb-4"
                title="Fechar"
                />
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-center">
                        <Image src={Logo} alt="Logotipo" className="w-[60%]" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="flex gap-4 items-center">
                        <AiFillHome color="white" size={28} />
                        Página Inicial
                        </span>
                        <span className="flex gap-4 items-center">
                        <AiOutlineSearch color="white" size={28} />
                        Pesquisar
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="flex gap-4 items-center">
                        <AiFillPlusSquare color="white" size={28} />
                        Adicionar Música
                        </span>
                        <span className="flex gap-4 items-center">
                        <AiOutlineHeart color="white" size={28} />
                        Músicas favoritas
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default LeftMenuSmallWindows;
