'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => {

    const handleDemoLink = (e) => {
        e.preventDefault();
        import("sonner").then(({ toast }) => {
            toast.info("This is a demo link", {
                description: "This feature is coming soon!",
            });
        });
    }

    return (
        <footer className="bg-[#F7F7F7] border-t border-gray-200 text-[#222222] text-sm">
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 px-4 py-12 border-b border-gray-200">
                    {/* Support Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold mb-1">Support</h3>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Help Centre</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">AirCover</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Anti-discrimination</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Disability support</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Cancellation options</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Report neighbourhood concern</Link>
                    </div>

                    {/* Hosting Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold mb-1">Hosting</h3>
                        <Link href="/become-a-host" className="hover:underline">Airbnb your home</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">AirCover for Hosts</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Hosting resources</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Community forum</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Hosting responsibly</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Join a free Hosting class</Link>
                    </div>

                    {/* Airbnb Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-bold mb-1">Airbnb</h3>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Newsroom</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">New features</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Careers</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Investors</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Gift cards</Link>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Airbnb.org emergency stays</Link>
                    </div>
                </div>

                <div className="py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span>© {new Date().getFullYear()} Airbnb, Inc.</span>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Privacy</Link>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Terms</Link>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Sitemap</Link>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" onClick={handleDemoLink} className="hover:underline">Company details</Link>
                    </div>

                    <div className="flex items-center gap-4 font-semibold">
                        <span>English (IN)</span>
                        <span>₹ INR</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
