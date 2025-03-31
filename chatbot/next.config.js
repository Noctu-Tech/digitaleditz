/** @type {import('next').NextConfig} */
const nextConfig = {
//   experimental: {
//   reactCompiler: true,
// },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },   {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
