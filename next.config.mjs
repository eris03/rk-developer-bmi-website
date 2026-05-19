/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.bmihousing.com" },
      { protocol: "https", hostname: "i.pravatar.cc" }
    ]
  },
  reactStrictMode: true
};

export default nextConfig;
