
import "./globals.css";
import Navbar from "@/components/Navbar";

import { Poppins } from "next/font/google";
import { getAuthSession } from "@/utils/auth";
import { Toaster } from "@/components/ui/sonner";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});



export default async function RootLayout({ children }) {
  const session = await getAuthSession();
 
  return (
    <html lang="en" className="">
      <body
        className={`${poppins.className}  antialiased`}
      >
        <Navbar />
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
