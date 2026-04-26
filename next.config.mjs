import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'onamidojo.fr' }],
        destination: 'https://www.onamidojo.fr/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://w.behold.so",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://*.google-analytics.com https://*.public.blob.vercel-storage.com https://*.cdninstagram.com https://*.fbcdn.net https://*.behold.so",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://feeds.behold.so https://w.behold.so",
              "media-src 'self' https://*.cdninstagram.com https://*.fbcdn.net",
              "frame-src https://www.google.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/documents/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
