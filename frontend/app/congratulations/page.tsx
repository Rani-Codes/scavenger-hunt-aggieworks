'use client';
import { useEffect, useState } from "react";
import { deleteUser, getUser } from "../utils/authAPI";
import Image from "next/image";
import Link from "next/link";

interface User {
    username: string;
    id: number;
}

const Page: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [alert, setAlert] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
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

    const handleDelete = async () => {
        if (!user) {
            setError("No user found to delete.");
            return;
        }
        
        try {
            await deleteUser(user.id);
            setAlert("User successfully deleted.");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                console.error("Caught an error that is not an instance of Error:", error);
            }
        }
    }

    return (
        <div className="text-center font-semibold text-2xl flex flex-col justify-center items-center py-10">
            {error && <h2 className="text-red-500">Error: {error}</h2>}
            {!error && user && (
                <>
                    <h1>Congratulations on beating the game</h1>
                    <h2>Thanks for playing <span className="text-green-500">{user.username}</span>!</h2>

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
                    
                    <button onClick={handleDelete} className="bg-black text-white p-3 mt-2 rounded font-bold text-lg hover:bg-opacity-80">
                        Delete User
                    </button>

                    <h4 className="mt-10">Go back to the home page?</h4>

                    <Link href={'/'}>
                        <button className="bg-yellow-400 rounded p-4 mt-2 font-bold text-lg hover:bg-opacity-80">
                            Home
                        </button>
                    </Link>

                    {alert && <h1 className="text-green-500">Message: {alert}</h1>}
                </>
            )}
        </div>
    );
};

export default Page;
