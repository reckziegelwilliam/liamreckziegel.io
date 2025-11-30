# Case Study Assets

This folder contains screenshots, diagrams, and visual assets for case studies.

## Structure

```
case-studies/
├── tout/
│   ├── hero.png (or.jpg)
│   ├── architecture-diagram.png
│   ├── before-after.png
│   └── metrics-dashboard.png
├── helpar/
│   ├── hero.png
│   ├── architecture-diagram.png
│   ├── monorepo-structure.png
│   └── nfc-flow.png
└── lumenaut/
    ├── hero.png
    ├── project-gallery.png
    └── process-diagram.png
```

## Image Guidelines

### Screenshots
- **Format:** PNG for UI screenshots, JPG for photos
- **Size:** Max 1920px wide for hero images, 1200px for inline images
- **Optimize:** Use tools like TinyPNG or ImageOptim before uploading
- **Naming:** Use kebab-case (e.g., `architecture-diagram.png`)

### Diagrams
- **Tools:** Excalidraw, Figma, Miro, or draw.io
- **Export:** PNG or SVG (SVG preferred for scalability)
- **Style:** Match portfolio color scheme (dark background, cyan/amber accents)
- **Content:** Keep text large and readable (min 14px)

## What to Create

### TOUT Technologies
1. **Hero image:** App screenshot or team photo
2. **Architecture diagram:** React Native app + Twilio + Sentry/Grafana setup
3. **Before/After:** Comparison showing stability improvements
4. **Metrics dashboard:** Chart showing crash reduction over time

### HELPAR
1. **Hero image:** Platform screenshot or dashboard
2. **Architecture diagram:** AWS Lambda + DynamoDB + S3 flow for NFC platform
3. **Monorepo structure:** Visual showing Turbo monorepo organization
4. **NFC flow:** Diagram of NFC tag → API → Analytics pipeline

### Lumenaut
1. **Hero image:** Collage of client work or studio setup
2. **Project gallery:** Grid of 6-8 project thumbnails
3. **Process diagram:** Your workflow from intake → delivery

## Placeholder Images

Until you create real assets, the case studies will work without images. 
You can add them incrementally as you create them.

## Quick Start Tools

- **Excalidraw:** https://excalidraw.com (great for architecture diagrams)
- **Figma:** https://figma.com (best for polished mockups)
- **Screenshots:** Use browser dev tools to capture at 2x resolution
- **Optimization:** https://tinypng.com

## Implementation

Once you have images, update the case study data in `app/data/case-studies.ts`:

```typescript
{
  slug: 'tout-technologies',
  // ... other fields
  coverImage: '/case-studies/tout/hero.png',
  images: [
    { url: '/case-studies/tout/architecture-diagram.png', caption: 'System architecture' },
    { url: '/case-studies/tout/before-after.png', caption: 'Stability improvements' },
  ]
}
```

Then display them in the case study template component.

