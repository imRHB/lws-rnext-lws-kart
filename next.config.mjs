/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SITE_URL:
            process.env.NODE_ENV === "production"
                ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                : "http://localhost:3000",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "source.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "plus.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
};

export default nextConfig;
