import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import "tippy.js/dist/tippy.css";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <>
            <CookiesProvider>
                <html lang="en" className="h-full">
                <body className="h-full">

                {children}

                <ToastContainer/>
                </body>
                </html>
            </CookiesProvider>
        </>
    )
}
