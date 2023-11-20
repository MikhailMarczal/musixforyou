"use client"
import { HTMLInputTypeAttribute, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

interface IPropsInput {
    type: HTMLInputTypeAttribute
}

export function Input(props: IPropsInput){
    return(
        <div>
            <input type={props.type} className="border rounded-sm"/>
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