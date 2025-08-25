
import "./globals.css";
import Navbar from "@/components/Navbar";

import { Poppins } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/SessionWrapper";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});



export default async function RootLayout({ children }) {
 
 
  return (
    <html lang="en" className="">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${poppins.className}  antialiased`}
      >
        <SessionWrapper>
         
        <Navbar />
        {children}
       
        <Toaster/>
        </SessionWrapper>
      </body>
    </html>
  );
}
