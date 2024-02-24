import Footer from "./footer";
import Navbar from "./navbar";
import React from "react";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="pb-16">{children}</main>
            <Footer />
        </>
    )
}