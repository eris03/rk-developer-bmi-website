# BMI Housing — Zoom-Scroll Website

A modern, cinematic makeover of **bmihousing.com** with a unique
**zoom-scroll** experience: every scroll *zooms* into the next section
instead of moving down the page.

---

## Files

```
BMI webiste/
├── index.html     ← markup for all 7 sections
├── styles.css     ← design system + zoom-scroll CSS
├── script.js      ← scroll engine, AI chat, popups
└── README.md      ← this file
```

---

## How to open in VS Code

1. Open **Visual Studio Code**.
2. `File → Open Folder…` → select **BMI webiste** on your Desktop.
3. (Optional) Install the **Live Server** extension by *Ritwick Dey*.
4. Right-click `index.html` → **Open with Live Server**.

The site opens at `http://127.0.0.1:5500/` with hot-reload.

> No build tools, no npm — just plain HTML / CSS / JS.

---

## Sections

The website has 7 zoom-transitioned scenes:

1. **Home** — hero with stats & CTAs
2. **Introduction** — about BMI Housing
3. **Projects** — 4 featured layouts
4. **Services** — what BMI offers
5. **Gallery** — community photos
6. **Testimonials** — member voices
7. **Contact** — enquiry form & details

Quick-jump nav lives at the **top** (and as a left-side dot rail on desktop).

---

## How the zoom-scroll works

* All sections are absolute-positioned inside `.stage` with CSS `perspective`.
* On `wheel` / touch / arrow keys, JavaScript intercepts scroll and adds
  `.zoomed-out` (recede backward) or `.zoomed-in` (push forward) classes
  to the outgoing scene, while the incoming scene becomes `.active`.
* A 1.1s cinematic transition with blur + scale + Z-translate gives the
  *"flying through layers"* feel.
* Inner content scrolls normally first — zoom only triggers when content
  reaches its scroll bound.

---

## Floating side icons (right edge)

| Icon | Action |
|------|--------|
| 🟢 WhatsApp | Opens `wa.me/919999999999` |
| 🟣 AI | Pop-up chat with smart canned replies |
| 🔵 Message | Quick contact form |
| 🟠 Contact | Jumps to the Contact section |
| 🔴 Call | `tel:+919999999999` |

Update the phone numbers in `index.html` (search `9999999999`) and
`script.js` (knowledge base) before going live.

---

## Customizing

* **Brand colors** — edit `:root` tokens at the top of `styles.css`.
* **Project cards** — duplicate/edit the `<article class="project-card">` blocks in `index.html`.
* **AI replies** — extend the `aiKB` array in `script.js`.
* **Background images** — swap the Unsplash URLs (`*-bg` classes in `styles.css`).

---

## Browser support

Latest Chrome, Edge, Firefox, Safari (desktop + mobile).
Animations gracefully shorten on `prefers-reduced-motion: reduce`.

Built for **BMI Housing** · 2026.
