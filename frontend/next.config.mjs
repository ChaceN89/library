/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.AWS_STORAGE_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION_NAME}.amazonaws.com`,
      },
    ],
  },
  env: {
    AWS_STORAGE_BUCKET_NAME: process.env.AWS_STORAGE_BUCKET_NAME,
    AWS_S3_REGION_NAME: process.env.AWS_S3_REGION_NAME,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
  },
  async rewrites() {
    return [
      {
        source: '/accounts/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + '/accounts/:path*', // Proxy to Django backend
      },
    ];
  },
};

export default nextConfig;
