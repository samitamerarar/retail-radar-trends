/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  env: {
    API_URL: 'http://localhost:5000',
  },
}

module.exports = nextConfig
