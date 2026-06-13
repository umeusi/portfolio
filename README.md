# Y.Parris — Portfolio Site

A static portfolio site for the painter Y.Parris. No build step, no
dependencies to install — every page is plain HTML/CSS that runs by opening
a file in the browser or serving the folder statically. 

## Structure

```
index.html            Landing page (scroll-driven cover)
works.html            Gallery overview
sketches.html         Sketch desk
about.html            About / bio
painters-tool.html    Interactive color + value mixing tool (React via CDN)

colors_and_type.css   Design tokens, type, @font-face
fonts/                EB Garamond, Inter, Larken
assets/               Paintings, logos, emblems, sketches (web-optimized)
data/                 Oil-paint pigment data for the Painter's Tool
painter-app.jsx       Painter's Tool app (transpiled in-browser by Babel)
munsell.jsx           Munsell color helpers
tweaks-panel.jsx      Optional in-page tweak panel
```

## Running locally

Just open `index.html` in a browser. For the Painter's Tool (which loads
`.jsx` over the network) use a local server so file requests resolve:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
For GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
Keep the `CNAME` file if one exists — it stores your custom domain.
