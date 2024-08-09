/** @type {import("next").NextConfig} */

import createMDX from "@next/mdx";

const withMDX = createMDX();

export default withMDX({
  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  reactStrictMode: false,
});
