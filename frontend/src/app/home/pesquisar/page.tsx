"use client"
import { ChangeEvent, useState } from "react";
import { PatternInput } from "@/components/patternComponents/inputs"
import api from "@/services/api";
import { IGetMusics, SearchCard } from "@/components/cards";
import { useRouter } from "next/navigation";

export default function Pesquisar(){

    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState<IGetMusics[]>()
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const { push } = useRouter();


    const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        
        setSearch(event.target.value);

        if(event.target.value.length >= 3){
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            const newTypingTimeout = setTimeout(() => {
                
                    api.get(`/music/getSearch/${event.target.value}`)
                    .then((res) => {
                        setSearchData(res.data)
                });
                
            }, 600);
        
            setTypingTimeout(newTypingTimeout);
        }

        setSearchData([])
    };

    function favorite(id: string){
        api.patch(`/music/favorite/${id}`)

        if(searchData && searchData.length > 0){
            const copyArray = searchData.slice()

            const index = copyArray.findIndex((item) => item.id == id)

            copyArray[index].favorito = !searchData[index].favorito
            
            setSearchData(copyArray)
        }
    }

    return(
        <div className="p-4 h-full">
            <PatternInput.Root onChange={(e) => handleInputChange(e)} value={search} placeholder="Pesquisar música" type="input">
                <PatternInput.Search />
            </PatternInput.Root>
            <div className="flex flex-col gap-2 pt-8">
                {searchData && searchData?.length > 0 ? searchData?.map((item) => {
                    return(
                        <SearchCard 
                            item={item} 
                            onClickFavorite={(e) => {
                                e.stopPropagation()
                                favorite(item.id)
                            }} 
                            onClickRedirect={() => push(`/home/${item.id}`)}    
                            key={item.id + item.nome}
                        />
                    )
                }) : null}
            </div>
        </div>
    )
}