import { motion } from "framer-motion"
import LoadingComponent from "./LoadingComponent"

export default function Loading(props: any){
    return(
        <div className="fixed z-50">
            <section className="w-screen min-h-screen fixed glassmorphism z-40" onClick={props.onClickClose}/>
                <div className="p-2 min-h-screen w-screen flex justify-center items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`z-50 relative overflow-hidden px-6 py-8  justify-center`}
                    >
                        <LoadingComponent />
                    </motion.div>
                </div>
        </div>
    )
}