/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    unoptimized: true, // SSL hatasını önlemek için görüntü optimizasyonunu devre dışı bırak
  },
};

export default nextConfig;
