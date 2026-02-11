/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: '/valentine', // Repository name in lowercase
  trailingSlash: true, // Important for GitHub Pages routing
  images: {
    unoptimized: true, // Required for static exports
  },
  reactStrictMode: true,
};

export default nextConfig;