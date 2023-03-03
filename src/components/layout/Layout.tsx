import React, { ReactNode } from "react";
import Navbar from "../navbar/Navbar";

interface Layout {
    children?: ReactNode;
}

const Layout: React.FC<Layout> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};
export default Layout;
