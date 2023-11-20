import Navbar from "@/components/Navbar"
import LeftMenu from "@/components/newLeftMenu"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}