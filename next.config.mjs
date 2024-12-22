import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  swcMinify: true,
  reloadOnOnline: true,
  fallbacks: {
    document: '/offline',
  },
  workboxOptions: {
    skipWaiting: true, // Forces the waiting service worker to become active
    clientsClaim: true, // Service worker takes control of the page as soon as it's activated
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst', // Use network first but fallback to cache if offline
        options: {
          cacheName: 'dynamic-content',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
    ],
  },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },

  images: {
    domains: ['i.imgur.com', '*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.seadn.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/', // Redirect all slug URLs to the homepage
      },
    ];
  },
};

export default withPWA(nextConfig);
