import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
        api.get('/api/users').then((response) => {
            setUser(response.data)
        })
            .catch((error) => {
                console.log(error);
                router.push('/login');
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
