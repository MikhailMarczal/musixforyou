import { Input, InputPassword } from "@/components/inputs";

export default function Home() {
    return (
        <main className="flex flex-col gap-2 w-full h-screen">
            Login
            {/* <Input type="text"/> */}
            <InputPassword className="w-[300px]"/>
        </main>
    )
}
