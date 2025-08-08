/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cbratkovics.dev', 'github.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/Resume_CJB.pdf',
        permanent: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/cbratkovics',
        permanent: false,
      },
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/in/cbratkovics',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig