/** @type {import('next').NextConfig} */
const nextConfig = {
  // static export: `pnpm build` writes a plain site to out/ that any static host can serve
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
