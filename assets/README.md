# Assets structure

Use this folder to store all static media that powers the VIKS Production site. Keeping assets here makes it easy to swap imagery without hunting through markup.

## Recommended layout

```
assets/
  images/
    portfolio/   # Portfolio thumbnails/posters shown on the Cases grid (horizontal + reels)
    about/       # About page photography and gallery items
    branding/    # Logos and brand marks
  videos/        # Self-hosted videos used for portfolio previews
```

## How to update images

1. Drop the new image into the appropriate folder (e.g. `assets/images/portfolio`).
2. Update `portfolio-config.js` (including the `orientation` field) or the relevant HTML to point at the new file.
3. Keep file names lowercase and use dashes for readability (e.g. `brand-launch-poster.jpg`).
