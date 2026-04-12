/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["172.31.90.195", "10.150.15.201"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

export default nextConfig;