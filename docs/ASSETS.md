# Adding Optional Assets

Place these files in the `public/` folder so the site uses them correctly.

## Resume PDF

- **Path:** `public/resume.pdf`
- **Used by:** Hero "View resume" button and Header "Resume" link
- **Note:** Export your resume as PDF and save it at this path. The download attribute uses `Sutharsan_Resume.pdf` as the suggested filename.

## Social Share Image (Open Graph / Twitter)

- **Path:** `public/og-image.png`
- **Used by:** `index.html` meta tags (`og:image`, `twitter:image`) for link previews when the site is shared
- **Recommended size:** 1200×630 pixels

## Project Images

Paths are already referenced in `src/components/Projects.tsx`. Add the image files to `public/`:

| Project        | Path                          |
|----------------|-------------------------------|
| Krishi Bot     | `public/project-krishi-bot.jpg`    |
| Medical Drone  | `public/project-medical-drone.jpg` |
| Flipkart GRID  | `public/project-flipkart-grid.jpg` |

LabConnect does not have an `imageUrl` in the project data; you can add one later in `Projects.tsx` and place the image in `public/` if you have a screenshot.
