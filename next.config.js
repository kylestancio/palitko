/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8090',
        // pathname: '/',
      },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        // pathname: '/',
      },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.51',
        port: '8080',
        // pathname: '/',
      },
    ],
  },
}

module.exports = nextConfig
