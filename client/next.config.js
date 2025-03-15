/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    env: {
        SERVER_URL: process.env.SERVER_URL,
    }
}

module.exports = nextConfig
