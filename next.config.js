module.exports = {
  devIndicators: {
    buildActivity: false,
  },
  /*experimental: {
    workerThreads: false,
    cpus: 1
  },*/
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/nobsc-official-uploads/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/nobsc-public-uploads/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/nobsc-private-uploads/**',
      },
    ],
  },
  pageExtensions: ['page.tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
};
