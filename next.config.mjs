/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/rails/active_storage/**",
      },
      {
        protocol: "https",
        hostname: "circle-backend-7y1u.onrender.com",
        pathname: "/rails/active_storage/**",
      },
    ],
  },
};

export default nextConfig;
