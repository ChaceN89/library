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
};

export default nextConfig;
