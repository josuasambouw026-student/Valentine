/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  basePath: '/Valentine', // Tambahkan ini sesuai nama repository kamu
};

export default nextConfig;