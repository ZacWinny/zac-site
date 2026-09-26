# zac-site

Personal site for me. Next.js + React, ready to host for free with a custom domain.

Edit copy, links, and project cards in `lib/site.ts`.

## Local

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Free hosting + custom URL

**Vercel** is the simplest match for this stack: Hobby plan is free, HTTPS is included, and custom domains are allowed.

1. Push this repo to GitHub.
2. Sign in at [vercel.com](https://vercel.com) with GitHub and import the repo.
3. Deploy. You get a `*.vercel.app` URL immediately.
4. In the project: **Settings → Domains** → add your domain (for example `zacwinters.com`).
5. At your domain registrar, add the DNS records Vercel shows (usually an `A` record for the apex and a `CNAME` for `www`).
6. Wait for DNS to propagate. Vercel issues a certificate automatically.

Buy the domain wherever you like (the host is free; the domain name is not). Once DNS points at Vercel, `https://your-domain` is the public URL.

Cloudflare Pages and Netlify also offer free custom domains if you prefer those later.
