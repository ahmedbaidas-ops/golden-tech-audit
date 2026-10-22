/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // ARTIFACT=1 builds with relative asset paths so the export can be opened from any folder.
  assetPrefix: process.env.ARTIFACT ? "./" : undefined,
}

export default nextConfig
