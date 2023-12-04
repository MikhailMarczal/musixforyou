"use client"
import { Masonry, MasonryOwnProps } from "@mui/lab";

export default function ClientMasonry(props: MasonryOwnProps & {children : React.ReactNode}){
    return (
        <Masonry {...props}>{props.children}</Masonry>
    )
}