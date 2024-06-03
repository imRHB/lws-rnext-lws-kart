/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SITE_URL:
            process.env.NODE_ENV === "production"
                ? "https://imrhb-lws-kart.vercel.app"
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
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
            },
        ],
    },
};

export default nextConfig;
