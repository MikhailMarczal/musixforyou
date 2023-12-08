import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from "react"
import "./styles.css"

interface InputRootProps {
    children?: ReactNode,
    type: HTMLInputTypeAttribute
    placeholder: string
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export default function InputRoot(props : InputRootProps){
    return(
        <div className={`form__group field ${props.className} flex items-center`}>
            <input type={props.type} className="form__field" placeholder="Name" required value={props.value} onChange={props.onChange}/>
            <label htmlFor="name" className="form__label flex items-center gap-2">
                {props.children}
                {props.placeholder}
            </label>
        </div>
    )
}