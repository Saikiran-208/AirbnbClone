/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hiirjlceksmlikim.public.blob.vercel-storage.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            }
        ]
    }
};

export default nextConfig;
