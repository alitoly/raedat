# Raedat News Package

This package contains organized news content and image assets for the website.

## Structure

- `content/raedat_news_content.json` — full JSON content file.
- `content/news/` — local/uploaded news items, each with `news.json` and `news.md`.
- `content/pressCoverage/` — external article/news links, each with `article.json` and `article.md`.
- `content/socialPosts/` — Instagram post/reel metadata. Instagram direct media download was blocked/throttled, so original links and embed URLs are kept.
- `images/news/` — images extracted from your uploaded zip.
- `images/press/` — images downloaded from public article links when accessible.

## Notes

Downloaded press images:
- Al Waha image downloaded successfully.
- Hala FM image downloaded successfully.

Not downloaded:
- Instagram media: blocked/throttled by Instagram; original links are preserved.
- Alroya image: direct image URL was found and kept in JSON, but file download failed from the downloader.
- Alsahwa: the page exposed an empty theme image, so the local UNESCO image is kept as fallback.

For a Next.js public folder, copy `images/` into `public/images/` and use the paths in the JSON.
