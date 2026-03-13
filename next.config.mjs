/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopack: {
      root: 'c:\\Users\\micha\\.antigravity\\v0-plumbing-landing-page',
    },
  },
}

export default nextConfig
