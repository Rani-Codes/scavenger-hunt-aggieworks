//Need to make page only accessible if user is signed in
'use client'
import { useEffect, useState } from "react"
import { get_Items } from "../utils/itemsAPI"
import Image from "next/image"

interface Item {
    title: string
    photo_url: string
    id: number
}

const page: React.FC = () => {
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await get_Items()
                setItems(data)
            }
            catch(error) {
                if(error instanceof Error) {
                    setError(error.message)
                }
            }

        }
        fetchItems()
    }, [])


  return (
    <div className="flex flex-col justify-center items-center">
        <div className="text-2xl">Scavenger Hunt Page</div>

        {error && <h3>Error: {error}</h3>}

        <div className="">
            {items.map((item) => {
                return (
                    
                    <div key={item.id}>
                        <h1 className="text-lg">Title: {item.title}</h1>

                        <Image
                            src={item.photo_url}
                            width={500}
                            height={500}
                            alt="Picture of a plant or animal around davis california"
                            />

                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default page