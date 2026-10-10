/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "itsonly.recipes",
      },
      {
        protocol: "https",
        hostname: "ristorante-africa.it",
      },
      {
        protocol: "https",
        hostname: "art.whisk.com",
      },
      {
        protocol: "https",
        hostname: "wfg32p.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "files.cdn-files-a.com",
      },
    ],
  },
};

export default nextConfig;