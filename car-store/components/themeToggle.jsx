import React from 'react';
import { useDarkMode } from '../utils/darkModeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { toggleDarkMode } = useDarkMode();

    return <>
        <button
            onClick={toggleDarkMode}
            className="rounded-md">
            <label className="relative cursor-pointer p-2" htmlFor="light-switch">

                <MoonIcon className="dark:hidden size-6" />
                <SunIcon className="hidden dark:block size-6" />

                <span className="sr-only">Switch to light / dark version</span>
            </label>
        </button>
    </>;
}
