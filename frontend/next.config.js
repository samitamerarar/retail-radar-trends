/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  env: {
    // API_URL: 'http://localhost:5000',
    API_URL: 'https://retailradartrends-api.samiarar.com',
  },
}

module.exports = nextConfig
