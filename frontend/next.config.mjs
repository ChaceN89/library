/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'library-app-data.s3.ca-west-1.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/accounts/:path*',
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + '/accounts/:path*', // Proxy to Django backend
      },
    ];
  },
};

export default nextConfig;
