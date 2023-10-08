/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
      serverActions: true,
    },
    async redirects() {
        return [
          {
            source: '/test',
            destination: '/test2',
            permanent: true,
          },
        ]
    },
}

module.exports = nextConfig
