/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/web-seiten',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig