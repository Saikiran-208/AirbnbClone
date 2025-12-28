
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Poppins } from "next/font/google";

import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});



export default async function RootLayout({ children }) {


  return (
    <ClerkProvider>
      <html lang="en" className="">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body
          className={`${poppins.className}  antialiased`}
        >

          <Navbar />
          <div className="pt-[80px] pb-20">
            {children}
          </div>
          <Footer />

          <Toaster />

        </body>
      </html>
    </ClerkProvider>
  );
}
