import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      {/* Navbar is strictly not needed here if it's in layout, but sometimes 404 overrides layout. 
        In Next.js app dir, not-found is inside layout usually. 
        I'll assume layout wraps it. If not, I'll adjust. 
        Actually, not-found.js inside app/ renders inside the root layout.
    */}
      <div className="min-h-[70vh] flex flex-col md:flex-row items-center justify-center max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-20 gap-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-bold text-[120px] md:text-[150px] leading-none text-[#484848] mb-4">
            Oops!
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#484848] mb-4">
            We can't seem to find the page you're looking for.
          </h2>
          <p className="text-[#484848] text-lg mb-8">
            Error code: 404
          </p>

          <div className="space-y-2">
            <p className="text-[#484848]">Here are some helpful links instead:</p>
            <ul className="list-none space-y-1 text-lg font-medium">
              <li><Link href="/" className="text-[#008489] hover:underline">Home</Link></li>
              <li><Link href="/search" className="text-[#008489] hover:underline">Search</Link></li>
              <li><Link href="/help" className="text-[#008489] hover:underline">Help</Link></li>
              <li><Link href="/hosting" className="text-[#008489] hover:underline">Traveling on Airbnb</Link></li>
              <li><Link href="/hosting" className="text-[#008489] hover:underline">Hosting on Airbnb</Link></li>
              <li><Link href="/trust" className="text-[#008489] hover:underline">Trust & Safety</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex-1 hidden md:block">
          {/* Illustration placeholder - could use an SVG or Image if we had one. 
             Airbnb uses a girl dropping ice cream. I'll make a simple SVG abstract representation or just leave nicely balanced space.
             For now, I'll remove the visual noise and keep it typographic which is also very "Airbnb implementation" if assets differ.
         */}
          <div className="w-full h-full flex justify-center items-center opacity-10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-[400px] h-[400px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}