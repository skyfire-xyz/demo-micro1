# Dependencies

## npm

- "axios"
- "react-hook-form"
- "framer-motion"
- "lodash"

## Shadcn/ui

```
npx shadcn@latest add popover skeleton toast dialog card form input table tooltip tabs
```

Note: Need to fix toasters import path.

## Code changes

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Add following
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
    ],
  }
}

export default nextConfig
```
