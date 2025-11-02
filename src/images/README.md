# Source images

Put your original (unoptimized) images here. They will be processed by `scripts/optimize-images.js` into `public/images/optimized/`.

## Blog cover convention

- Per post, create a folder in `src/images/blog/<slug>/`.
- Name the cover file `<slug>-cover.(jpg|jpeg|png)`.
- Example: `src/images/blog/transparentnost/transparentnost-cover.jpg`.

When you run the optimizer (it also runs before `npm run build`), it will generate responsive variants like:

- `/images/optimized/<slug>-cover-w400.avif`
- `/images/optimized/<slug>-cover-w800.avif`
- `/images/optimized/<slug>-cover-w1200.avif`

The posts are already configured to point to the `-w800.avif` variant via the `cover` front matter field, e.g.:

```yaml
cover: "/images/optimized/transparentnost-cover-w800.avif"
```

You can change the width or format if needed.
