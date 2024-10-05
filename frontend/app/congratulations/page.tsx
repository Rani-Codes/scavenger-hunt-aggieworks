'use client';
import { useEffect, useState } from "react";
import { getUser } from "../utils/authAPI";
import Link from "next/link";
import Image from "next/image";

interface User {
    username: string;
}

const Page: React.FC = () => {
    const [user, setUser] = useState<User | null>(null); // Initial state can be null
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => { // Renamed for clarity
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="text-center font-semibold text-2xl flex flex-col justify-center items-center py-10">
            {error ? (
                <h2 className="text-red-500">Error: {error}</h2>
            ) : (
                <>
                    <h1>Congratulations on beating the game</h1>
                    <h2>Thanks for playing <span className="text-green-500">{user?.username}</span>!</h2>

                    <div className="m-4 sm:m-10">
                        <Image
                            src={'/congrats.gif'}
                            width={500}
                            height={500}
                            alt="Picture of a plant or animal around davis california"
                            className='rounded-xl'
                            priority
                        />
                    </div>

                    <h4 className="mt-10">Wanna delete your user?</h4>
                    
                    <Link href={'/'}>
                        <button className="bg-black text-white p-3 mt-2 rounded font-bold text-lg hover:bg-opacity-80">
                            Delete User
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Page;
