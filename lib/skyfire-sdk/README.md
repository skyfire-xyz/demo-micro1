# Dependencies

## npm

- "axios"
- "react-hook-form"
- "framer-motion"
- "lodash" (also `yarn add @types/lodash`)

## Shadcn/ui

```
npx shadcn@latest add popover skeleton toast dialog card form input table tooltip tabs
```

Note: Need to fix toasters import path.

## Code changes

Update next.config.mjs

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

Update tailwind.config to include lib folder

```
...
content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
...
```
