import Footer from "./footer";
import Navbar from "./navbar";
import React from "react";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}