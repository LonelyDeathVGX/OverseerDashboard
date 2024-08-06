/** @type {import("next").NextConfig} */

const config = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: false,
};

export default config;
