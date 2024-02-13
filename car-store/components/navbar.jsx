import React from 'react';
import Link from 'next/link';
import ThemeToggle from './themeToggle';


export default function Navbar() {
    return (

        <nav className="flex justify-between items-center py-4 px-8 bg-gray-900 text-white">
            <div className="flex items-center space-x-4">
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
                <Link href="/">Home</Link>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none"
                    />
                    <button className="absolute right-0 top-0 mt-1 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </button>
                </div>

            </div>

            <img src="/logo.png" alt="Car Store" className="flex w-20 h-20 scale-150" />





            <ThemeToggle />
        </nav>

    );
};
