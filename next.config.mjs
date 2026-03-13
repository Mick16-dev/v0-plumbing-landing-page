/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: 'c:\\Users\\micha\\.antigravity\\v0-plumbing-landing-page',
  },
}

export default nextConfig
