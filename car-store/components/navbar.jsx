import React, { useContext, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './themeToggle';
import { UserContext } from '../utils/userContext';
import api from '../utils/api'
import { useRouter } from 'next/router';

import { ArrowLeftStartOnRectangleIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    const { user, setUser } = useContext(UserContext);

    const router = useRouter();
    const [searchValue, setSearchValue] = useState(router.query.search || '');
    const onLogOut = () => {
        api.get('/api/users/logout').then((res) => {
            setUser(null);
            router.push('/login');
        }).catch((error) => {
            console.log(error);
            router.push('/login');
        });
    };
    const handleSearch = () => {
        router.push({
            pathname: '',
            query: { search: searchValue || '' },
        });
    };

    return (
        <nav className="flex justify-between items-center py-2 px-8 text-black bg-red-600 dark:bg-red-900 dark:text-white">
            <div className="flex items-center space-x-4">
                <img src="/logo.png" alt="Car Store" className="flex me-7 w-20 h-20 scale-150" />
                <Link href="/">Home</Link>
                {user && user.role === 'Seller' && <Link href="/myCars">My Cars</Link>}
                {user && <Link href="/myOrders">Orders</Link>}
                {!user && <Link href="/login">Login</Link>}
                <Link href="/statistics">Statistics</Link>
                <div className="relative flex">
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSearch() : undefined}
                        type="text"
                        placeholder="Search car..."
                        className="px-3 text-white placeholder:text-red-950 bg-red-900 dark:bg-red-500 py-1 rounded-md focus:outline-none"
                    />
                    <button onClick={handleSearch} className="absolute right-0 top-0 mt-1 mr-1">
                        <MagnifyingGlassIcon className='w-6 h-6' />
                    </button>
                </div>

            </div>
            <div className="flex space-x-4 flex-row ms-auto items-center">

                <ThemeToggle />
                {user && <>
                    <Link href="/profile">
                        <UserIcon className="w-6 h-6"></UserIcon>
                    </Link>
                    <button onClick={onLogOut}>
                        <ArrowLeftStartOnRectangleIcon className="w-6 h-6"></ArrowLeftStartOnRectangleIcon>
                    </button>
                </>}
            </div>
        </nav>
    );
};
