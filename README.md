# Astro + Auth.js

This is a simple example of how to use [Astro](https://astro.build) with [Auth.js](https://authjs.dev) using the unofficial [Astro Auth.js Adapter](https://npmjs.com/package/auth-astro) to handle authentication.

Check out the [live demo](https://auth-astro-example.vercel.app) or [tutorial](https://blog.otterlord.dev/post/authjs-astro) for more information.

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── api/
│           └── auth/
│               └── [...astroAuth].ts
│       └── index.astro
│       └── protected.astro
└── package.json
```
