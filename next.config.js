/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images2.imgbox.com'],
  },
  webpack: (config) => {
    /**
     * Top-level await required to ensure Next.js getServersideProps
     * doesn't get run before MSW is ready.
     *
     * Also, MSW will not work with Node 18. Node 16 used in this repo.
     *
     * @see https://github.com/mswjs/msw/issues/1340
     */
    config.experiments.topLevelAwait = true;
    return config;
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
