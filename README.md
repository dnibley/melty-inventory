# Melty Inventory PWA

Mobile-first weekly inventory counting app for Melty locations.

## Local development

```bash
npm install
npm run dev
```

## Deploy to Vercel

This repo auto-deploys via Vercel. Push to `main` → live in ~30 seconds.

## File structure

```
melty-inventory-pwa/
├── public/
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
├── src/
│   ├── main.jsx
│   └── App.jsx          ← all item data + UI lives here
├── index.html
├── vite.config.js
└── package.json
```

## Updating the item list

All inventory items are defined in `src/App.jsx` in the `ITEM_MASTER` array at the top of the file. Each item has:

- `id` — unique number
- `name` — full item name
- `packSize` — e.g. "2/5 lb"
- `category` — used for grouping and filtering
- `location` — Walk-In, Freezer, Dry Storage
- `unit` — lb, each, Gallon, etc.
