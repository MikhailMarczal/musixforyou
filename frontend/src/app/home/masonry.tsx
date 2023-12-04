"use client"
import { Masonry, MasonryOwnProps } from "@mui/lab";

interface IPropsMasonry extends MasonryOwnProps{
    className?: string
}

export default function ClientMasonry(props: IPropsMasonry & {children : React.ReactNode}){
    return (
        <Masonry {...props} className={props.className}>{props.children}</Masonry>
    )
}