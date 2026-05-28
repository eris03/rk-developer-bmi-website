/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.bmihousing.com" },
      { protocol: "https", hostname: "i.pravatar.cc" }
    ]
  },
  reactStrictMode: true,

  async redirects() {
    return [
      { source: "/home-v1",                                    destination: "/",                              permanent: true },
      { source: "/home-v1/our-projects",                       destination: "/our-projects",                  permanent: true },
      { source: "/home-v1/our-projects/garden-city",           destination: "/our-projects/garden-city",      permanent: true },
      { source: "/home-v1/our-projects/north-metro-city",      destination: "/our-projects/north-metro-city", permanent: true },
      { source: "/home-v1/membership",                         destination: "/membership",                    permanent: true },
      { source: "/home-v1/purchase-site",                      destination: "/purchase-site",                 permanent: true },
      { source: "/home-v1/e-brochure",                         destination: "/e-brochure",                    permanent: true },
      { source: "/home-v1/application-registration",           destination: "/application-registration",      permanent: true },
      { source: "/home-v1/disclaimer",                         destination: "/disclaimer",                    permanent: true },
    ];
  },
};

export default nextConfig;
