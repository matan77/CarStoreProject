import React from 'react';

export default function Footer() {
    return (
        <footer className="text-white py-4 text-center fixed bottom-0 w-full">
            <p className="text-sm">&copy; All rights reversed {new Date().getFullYear()} by Matan Haver</p>
        </footer>
    );
};
