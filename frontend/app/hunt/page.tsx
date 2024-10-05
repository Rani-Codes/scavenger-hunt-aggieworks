'use client'
import { useEffect, useState } from "react"
import { getItems } from "../utils/itemsAPI"
import Image from "next/image"
import Link from "next/link"

interface Item {
    title: string
    photo_url: string
    id: number
}

const page: React.FC = () => {
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState<string | null>(null)
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getItems()
                setItems(data)
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            }
        }
        fetchItems()
    }, [])

    const handleClick = (id: number) => {
        if (selectedItems.includes(id)) {
            // Remove the clicked item if already in array
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            // Add item to array
            setSelectedItems([...selectedItems, id]);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mb-20">
            <div className="my-4 text-center">
                <h1 className="text-3xl font-bold">Scavenger Hunt</h1>
                <h5 className="text-xl font-semibold mt-4">Found {selectedItems.length} out of {items.length} items</h5>
                <h6 className="">Explore Davis and find all these plants and animals. When you find one click on the picture to check it off.</h6>
                <h6 className="font-semibold">Find them all for a special suprise... 👀</h6>
            </div>

            {error && <h3 className="text-3xl text-red-500">Error: {error}</h3>}

            <div className={`${items.length ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-20" : "grid grid-cols-1"}`}>
                {items.map((item) => {
                    const isClicked = selectedItems.includes(item.id);
                    return (
                        <div key={item.id} className="flex flex-col justify-center items-center">
                            <h1 className="text-lg font-semibold text-center">Title: {item.title}</h1>

                            <div className="relative rounded-xl overflow-hidden" onClick={() => handleClick(item.id)}>
                                <Image
                                    src={item.photo_url}
                                    width={250}
                                    height={250}
                                    alt="Picture of a plant or animal around davis california"
                                    className={`rounded-xl bg-black p-2 ${isClicked ? 'opacity-60' : 'opacity-100'}`}
                                    priority
                                />
                                {isClicked && (
                                    <div className="absolute inset-0 bg-black opacity-50" />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {!error && selectedItems.length === items.length && items.length !== 0 && (
                    <div className="mt-4 sm:mt-10 flex flex-col justify-center items-center w-full h-full">
                        <h1 className="text-xl font-bold text-center">You have completed the scavanger hunt, click continue.</h1>
                        
                        <Link href={'/congratulations'}>
                        <button className="bg-black text-white p-3 mt-2 rounded font-bold text-lg hover:bg-opacity-80">
                            Continue
                        </button>
                        </Link>
                    </div>

                )}


        </div>
    )
}

export default page