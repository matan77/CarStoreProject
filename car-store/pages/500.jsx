import Link from "next/link";
import React from "react";

export default function Page500() {
    return (
        <div className="flex items-center justify-center h-screen">
            <img src="/logo.png" alt="Car Store" className="absolute top-0 left-0 w-28 h-28" />

            <div className="text-center">
                <div className="relative flex items-center justify-center">
                    <h1 className="text-9xl font-bold mb-4">4</h1>
                    <img src="/404.png" alt="404" className="w-28 h-28" />
                    <h1 className="text-9xl font-bold mb-4">4</h1>
                </div>
                <h1 className="text-9xl font-bold mb-4">Oops!</h1>
                <p className="text-5xl my-7">Sorry, internal server error</p>
                <Link href="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
