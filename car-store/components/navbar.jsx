import React, { useContext } from 'react';
import Link from 'next/link';
import ThemeToggle from './themeToggle';
import { UserContext } from '../utils/userContext';
import api from '../utils/api'
import { useRouter } from 'next/router';

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    const onLogOut = () => {
        api.get('/api/users/logout').then((res) => {
            setUser(null);
            router.push('/login');
        }).catch((error) => {
            console.log(error);
            router.push('/login');
        });
    };

    // const user = { firstName: 'matan', lastName: 'haver' }
    return (
        <nav className="flex justify-between items-center py-2 px-8 text-black bg-red-600 dark:bg-red-900 dark:text-white">
            <div className="flex items-center space-x-4">
                <img src="/logo.png" alt="Car Store" className="flex me-7 w-20 h-20 scale-150" />
                <Link href="/">Home</Link>
                {!user && <Link href="/login">Login</Link>}
                <Link href="/statistics">Statistics</Link>
                <div className="relative flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 text-white placeholder:text-red-950 bg-red-900 dark:bg-red-500 py-1 rounded-md focus:outline-none"
                    />
                    <button className="absolute right-0 top-0 mt-1 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className="flex space-x-4 flex-row ms-auto items-center">

                <ThemeToggle />
                {user && <>
                    <Link href="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </Link>
                    <button onClick={onLogOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </button>
                </>}
            </div>
        </nav>
    );
};
