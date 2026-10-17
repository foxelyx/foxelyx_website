import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  // These run in `next dev` only. A static export does not apply them;
  // production 301s live in public/.htaccess and vercel.json.
  async redirects() {
    return [
      { source: "/clients", destination: "/work", statusCode: 301 },
      { source: "/clients/:id", destination: "/work/:id", statusCode: 301 },
      { source: "/search", destination: "/work", statusCode: 301 },
      { source: "/brand/:id", destination: "/work", statusCode: 301 },
      { source: "/pricing", destination: "/products", statusCode: 301 },
    ];
  },
};

export default nextConfig;
