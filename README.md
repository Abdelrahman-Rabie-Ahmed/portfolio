# Abdelrahman Rabie — Portfolio

Static site (HTML/CSS/JS, no build step) + one serverless function (`api/contact.js`) that sends contact-form emails through **Resend**. Deploy on **Vercel** (free).

## Files
| Path | Purpose |
|---|---|
| `index.html`, `styles.css`, `main.js` | The site (light/dark theme, nav, sections, form logic) |
| `data.js` | **All your content** — projects, skills, experience, links |
| `api/contact.js` | Contact-form backend (validation, honeypot, rate limit, Resend) |
| `assets/Abdelrahman_Rabie_CV.pdf` | The CV behind every "Download CV" button |
| `assets/projects/<slug>/1.jpg 2.jpg 3.jpg` | Your 3 photos per project |
| `.env.example` | Names of the environment variables to set |

## 1. Add your photos
Save 3 images per project with these exact names (`.jpg`):
```
assets/projects/glucoai/1.jpg 2.jpg 3.jpg
assets/projects/alu-fpga/1.jpg 2.jpg 3.jpg
assets/projects/school-degree-system/1.jpg 2.jpg 3.jpg
assets/projects/blood-bank/1.jpg 2.jpg 3.jpg
```
`1.jpg` is the large hero image of the gallery. Use landscape images ~1600px wide, under ~400 KB each (compress at squoosh.app). Until a file exists, a "Photo coming soon" placeholder shows. Want `.png`/`.webp`? Change the filename in that project's `photos` list in `data.js`.

## 2. Set up email (Resend)
1. Create a free account at https://resend.com and **create an API key** (Dashboard → API Keys).
2. **Testing:** use `CONTACT_FROM_EMAIL=onboarding@resend.dev`. Resend only delivers this to the email you signed up with, so sign up with the address you want messages sent to.
3. **Production:** add and verify your own domain in Resend (Domains → add DNS records), then use e.g. `contact@yourdomain.com` as `CONTACT_FROM_EMAIL`.
4. Never commit the key. Set the three variables from `.env.example` in Vercel (below).

## 3. Deploy on Vercel
1. Put this folder in a GitHub repo (`.env` is git-ignored).
2. https://vercel.com → **Add New → Project** → import the repo. Framework preset: **Other**. No build command, no output directory.
3. **Settings → Environment Variables:** add `RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL` (Production + Preview). **Redeploy** after adding them.
4. Open your site, send a test message, and check your inbox (and spam folder). The form only shows "sent" when Resend accepts the email.

Run locally: `npm i -g vercel`, copy `.env.example` to `.env`, then `vercel dev`. Opening `index.html` directly works for design, but the form needs `/api/contact` (so `vercel dev` or a deployment).
Other hosts: Netlify/Cloudflare need the function adapted to their format; ask and I'll convert it.

## 4. Edit content
Everything lives in `data.js`: add `github`, `demo`, extra `notes` bullets and `results` for each project; they appear automatically. Add a new project by copying one object in `projects` and creating its photo folder. To update the CV, replace the PDF keeping the same filename. Set your real domain in `index.html` (add `<link rel="canonical">`) once known.

## Notes
- If the form is not configured, visitors see a clear error and your email address; it never pretends to send.
- The API has a honeypot field, server-side validation and a basic per-IP limit (3 per 10 min on a warm instance). Message contents are never logged.
