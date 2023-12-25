module.exports = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/nobsc-official-uploads/**',
      },
    ],
  },
  pageExtensions: ['page.tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
};
