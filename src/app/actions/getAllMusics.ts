import { client } from "@/lib/db"

export const getMusics = async () => {
    const result = await client.zRangeWithScores('musics', 0, -1)

    const musics = await Promise.all(result.map((item) => {
        return client.hGetAll(`music:${item.value}`)
    }))

    console.log(musics)

    return musics
}