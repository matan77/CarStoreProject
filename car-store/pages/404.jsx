
import Link from "next/link";

export default function Page404() {

    return (
        <>
            <div className="container justify-center mx-auto">
                <img
                    src="/logo.png"
                    alt="Car Store"
                    className="flex mx-auto w-28 h-28"
                />
            </div>
            <div className="text-center my-auto">
                <div className="relative flex items-center justify-center">
                    <h1 className="text-9xl font-bold mb-4">4</h1>
                    <img src="/404.png" alt="404" className="w-28 h-28" />
                    <h1 className="text-9xl font-bold mb-4">4</h1>
                </div>
                <h1 className="text-9xl font-bold mb-4">Oops!</h1>
                <p className="text-5xl my-7">
                    Sorry, the page you are looking for does not exist
                </p>
                <Link href="/">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Back to Home
                    </button>
                </Link>
            </div>
        </>
    );
}
