import { AiOutlineMenu } from "react-icons/ai";

interface IProps {
    windowMd: boolean
    handleLeftMenu: () => void;
}

export default function Navbar(props: IProps) {

    return (
        <header className={`w-full bg-[#111111] text-white shadow-md`}>
            <div className="flex items-center justify-between h-20 px-4 sm:px-6">
                {!props.windowMd ? (
                    <AiOutlineMenu size={32} className="cursor-pointer" onClick={props.handleLeftMenu} />
                    ) : (
                    <div className="flex gap-3 xsm:gap-5 items-center text-2xl font-semibold">
                        Bem vindo, usuário
                    </div>
                )}
                
                <div className="gap-4 flex items-center">
                    <p>
                        Registrar
                    </p>
                    <span className="bg-blue-400 rounded-full p-4 text-black font-bold">
                        Entrar
                    </span>
                </div>
            </div>
        </header>
    );
}
