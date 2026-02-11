/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export', // Pastikan baris ini ada di dalam kurung kurawal nextConfig
};

export default nextConfig;