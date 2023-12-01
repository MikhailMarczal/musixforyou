"use client"
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react"
import { AiOutlineCloudUpload, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsTrash3 } from "react-icons/bs";
import "./styles.css"
import { IButton, IChildren } from "@/interfaces/Button";
import styles from "./AnimatedButton.module.css"

interface IPropsInput {
    type: HTMLInputTypeAttribute
    placeholder: string
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export function Input(props: IPropsInput){
    return(
        <div className={`form__group field ${props.className}`}>
            <input type={props.type} className="form__field" placeholder="Name" required value={props.value} onChange={props.onChange}/>
            <label htmlFor="name" className="form__label">{props.placeholder}</label>
        </div>
    )
}

interface IPropsInputPassword {
    className?: string
}

export function InputPassword(props: IPropsInputPassword){
    const [isViewActive, setIsViewActive] = useState<Boolean>(false)

    return(
        <div className={`${props.className} border rounded-sm flex items-center justify-between px-2`}>
            <input type="password" name="password" id="password" className="outline-none" />
            <label className="cursor-pointer">
                {isViewActive ? <AiOutlineEye onClick={() => setIsViewActive(old => !old)} /> : <AiOutlineEyeInvisible onClick={() => setIsViewActive(old => !old)} />}
            </label>
        </div>
    )
}

interface IPropsInputImage{
    acceptedFiles: string
    handleImages: (e: any) => void;
    capa?: File
    clickRemoveCapa: () => void;
}

export function InputImage(props: IPropsInputImage){
    return(
        <label 
            htmlFor="inputArchivesWithDrag" 
            className={`group-hover:bg-slate-200 border-2 p-4 border-pormadeMediumGray/80 hover:border-pormadeGreen hover:bg-pormadeLightGray/60 animation border-dashed rounded-md cursor-pointer relative z-80 flex justify-center`}
        >
            {props.capa ? (
            <div 
                className="bg-white absolute p-2 rounded-md top-6 right-6 z-100" 
                onClick={(evt) => {
                    evt.preventDefault()
                    props.clickRemoveCapa()
                }}
            >
                <BsTrash3 color="red" size={25} />
            </div>
        ) : null}
            {!props.capa ? (
                <div className="col-span-full w-full text-center items-center flex flex-col">
                    <AiOutlineCloudUpload size={32} color="#f5f5f5" className="animate-bounce"/>
                    <strong className="text-[#f5f5f5]">Clique para enviar uma imagem</strong>
                </div>) : (
                    <img src={URL.createObjectURL(props.capa)} alt="" className="max-h-[400px]"/>
                )}
            <input 
                type="file" 
                name="inputArchivesWithDrag" 
                id="inputArchivesWithDrag"  
                className="hidden"  
                onChange={(evt) => props.handleImages(evt)}
                accept={props.acceptedFiles}
            />
        </label>
    )
}

/**
 * @param {string} text
 * @param {"full" | "auto"} width
 * @param {"large" | "medium" | "small" | "custom"} size
 * @param {string} className if size is "custom" information your tailwind size
 */
export function Button(props: IButton & IChildren) {
    const color =
        props.color == "red" ? "linear-gradient-red" : "blue";
    const widhtButton = props.width == "full" ? "w-full" : "w-auto";
    const sizeButton =
        props.size === "custom"
            ? props.className ?? ""
            : props.size == "large"
            ? "px-6 py-4"
            : props.size == "medium"
            ? "px-5 py-3"
            : "px-4 py-2";

    return (
        <button
            className={`button border-2 border-white rounded-md animate ${widhtButton} ${sizeButton}  ${
                props.className ?? ""
            }`}
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
            {props.children}
        </button>
    );
}


interface IPropsAnimatedButton {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
}

export function AnimatedButton(props: IPropsAnimatedButton) {
    return (
        <button
            onClick={props.onClick}
            className={`${props.className} ${styles.animatedButton}`}
        >
            {props.text}
        </button>
    );
}

