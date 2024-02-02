'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const navLinks = [
    {
        id: 0,
        title: "Home",
        path: '/'
    },
    {
        id: 1,
        title: "Users",
        path: '/users'
    },
    {
        id: 2,
        title: "Profile",
        path: '/profile'
    },
]

const Navbar = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 20));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (
        <main className="h-16 w-full flex items-center justify-between px-10 bg-[--primary-blue] rounded-b-2xl">
            <h2 className="uppercase font-bold text-lg font-serif text-white">Alpaago</h2>
            <ul className="flex space-x-20 text-white">
                {
                    navLinks.map((link) => {
                        return <li key={link.id}>
                            <Link href={link.path}>{link.title}</Link>
                        </li>
                    })
                }

            </ul>

            <div>
                {loading ?
                    <p className="px-3 text-sm cursor-pointer border bg-white text-[--primary-blue] rounded-md hover:text-sm font-semibold">
                        Loading...
                    </p> : !user ? (
                        <button type='button' onClick={handleSignIn} className="px-5 text-sm cursor-pointer border bg-white text-[--primary-blue] rounded hover:text-sm font-semibold">
                            Login
                        </button>
                    ) : (
                        <div className="flex items-center">
                            <p className="text-white ">Welcome, {user.displayName}</p>
                            <button type="button" onClick={handleSignOut} className="ml-7 px-5 text-sm cursor-pointer border bg-white text-[--primary-blue] rounded-md font-semibold">
                                Logout
                            </button>
                        </div>
                    )}
            </div>
        </main>
    );
};

export default Navbar;
