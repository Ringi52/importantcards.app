/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/importantcards.app' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;