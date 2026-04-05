/** @type {import('next').NextConfig} */
const fs = require('fs')
const path = require('path')

// Copy product images from ./assets/ → ./public/assets/ on startup
try {
  const src = path.join(__dirname, 'assets')
  const dest = path.join(__dirname, 'public', 'assets')
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
    fs.readdirSync(src).forEach((file) => {
      const destFile = path.join(dest, file)
      if (!fs.existsSync(destFile)) fs.copyFileSync(path.join(src, file), destFile)
    })
  }
} catch (e) {
  console.warn('Asset copy skipped:', e.message)
}

const nextConfig = {
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
