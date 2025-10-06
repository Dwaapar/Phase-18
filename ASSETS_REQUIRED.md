# Required Assets for Findawise Platform

This document outlines all the assets needed for the Findawise platform, including their specifications, locations, and descriptions.

## 🎬 Video Assets

### Hero Background Video
**Location:** `/public/videos/hero-background.mp4`
**Used in:** `src/components/homepage/CinematicHero.tsx` (line 25)
**Specifications:**
- Format: MP4 (H.264)
- Resolution: 1920x1080 (Full HD)
- Duration: 10-15 seconds seamless loop
- File size: <10MB for web optimization
- Style: Dark abstract/geometric motion graphics
- Content: Subtle animated patterns, geometric shapes, or abstract motion
- Mood: Professional, sophisticated, minimal
- Color palette: Dark grays, blacks with subtle blue accents (#0F62FE)
- Requirements: Autoplay, muted, seamless loop

### Automation Demo Video
**Location:** `/public/videos/automation-demo.mp4`
**Used in:** `src/pages/AutomationPage.tsx` (line 180)
**Specifications:**
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Duration: 2-3 minutes
- Content: Step-by-step automation building process
- Include: Before/after workflow comparisons
- Style: Professional narration + screen recording
- Show: Dashboard interfaces, workflow builders, analytics screens

### Automation Hero Video
**Location:** `/public/videos/automation-hero.mp4`
**Used in:** `src/pages/AutomationPage.tsx` (line 120)
**Specifications:**
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Duration: 30-60 seconds
- Content: Dashboard overview, workflow creation
- Style: Clean, professional UI shots
- Requirements: Autoplay, muted, seamless loop

## 🖼️ Image Assets

### Hero Poster Image
**Location:** `/public/images/hero-poster.jpg`
**Used in:** `src/components/homepage/CinematicHero.tsx` (line 26)
**Specifications:**
- Resolution: 1920x1080
- Format: JPG
- Content: Professional screenshot of Findawise dashboard
- Style: Clean, modern interface
- Purpose: Fallback poster for hero video

### Automation Screenshots
**Location:** `/public/images/automation/`
**Used in:** `src/pages/AutomationPage.tsx` (lines 140-150)
**Files needed:**
- `lead-qualification-pipeline.png` (800x600px)
- `customer-onboarding-flow.png` (800x600px)
- `invoice-processing-bot.png` (800x600px)
**Content:** High-quality dashboard screenshots showing:
- Workflow builders with visual flow diagrams
- Analytics screens with real data
- Clean, modern UI design matching professional aesthetic

### Process Phase Images
**Location:** `/public/images/automation/`
**Used in:** `src/pages/AutomationPage.tsx` (lines 220-240)
**Files needed:**
- `discovery.jpg` (square aspect ratio, 600x600px)
- `development.jpg` (square aspect ratio, 600x600px)
- `monitoring.jpg` (square aspect ratio, 600x600px)
**Content:**
- Discovery: Team consultation/planning meeting
- Development: Developers coding/building (professional office setting)
- Monitoring: Dashboard/analytics screens being reviewed
**Style:** Professional photos, business setting, high quality

### Project Showcase Images
**Location:** `/public/images/projects/`
**Used in:** `src/components/homepage/WorkShowcase.tsx` (line 45)
**Files needed:**
- `project1.jpg` (800x600px) - Global brand campaign showcase
- `project2.jpg` (800x600px) - E-commerce platform interface
- `project3.jpg` (800x600px) - Content strategy visualization
- `project4.jpg` (800x600px) - Performance marketing dashboard
**Style:** High-quality project screenshots or mockups, professional composition

### Insights/Blog Images
**Location:** `/public/images/insights/`
**Used in:** `src/components/homepage/InsightsSection.tsx` (line 45)
**Files needed:**
- `insight1.jpg` (600x450px) - Digital transformation themed
- `insight2.jpg` (600x450px) - AI/technology themed
- `insight3.jpg` (600x450px) - Data/analytics themed
**Style:** Professional, editorial-style images, dark/moody aesthetic

### Client Logos
**Location:** `/public/images/clients/`
**Used in:** `src/components/homepage/ClientsSection.tsx` (line 25)
**Files needed:**
- `adobe.png` (200x100px, transparent background)
- `microsoft.png` (200x100px, transparent background)
- `google.png` (200x100px, transparent background)
- `amazon.png` (200x100px, transparent background)
- `netflix.png` (200x100px, transparent background)
- `spotify.png` (200x100px, transparent background)
- `nike.png` (200x100px, transparent background)
- `adidas.png` (200x100px, transparent background)
- `coca-cola.png` (200x100px, transparent background)
- `mcdonalds.png` (200x100px, transparent background)
- `samsung.png` (200x100px, transparent background)
- `apple.png` (200x100px, transparent background)
**Style:** Grayscale or monochrome versions, clean professional logos

## 📱 Favicon and App Icons

### Favicon
**Location:** `/public/favicon.ico`
**Used in:** `index.html` (line 4)
**Specifications:**
- Format: ICO
- Sizes: 16x16, 32x32, 48x48
- Design: Findawise "F" logo or abstract symbol
- Style: Clean, recognizable at small sizes

### App Icon
**Location:** `/public/vite.svg`
**Used in:** `index.html` (line 4)
**Specifications:**
- Format: SVG
- Size: Scalable vector
- Design: Findawise logo mark
- Style: Modern, clean, professional

## 🎨 Design Specifications

### Color Palette
Primary colors used throughout:
- **Monks Black:** #000000
- **Monks Accent:** #0F62FE (primary blue)
- **Monks Hover:** #0043CE (darker blue)
- **Monks Gray:** #525252
- **Monks Light Gray:** #F4F4F4

### Typography
- **Font Family:** IBM Plex Sans
- **Weights:** 300, 400, 500, 600, 700
- **Loaded from:** Google Fonts

### Image Guidelines
1. **Consistency:** All images should maintain a consistent professional aesthetic
2. **Quality:** High resolution for retina displays (2x pixel density)
3. **Optimization:** Compressed for web (use tools like TinyPNG)
4. **Format:** JPG for photos, PNG for graphics with transparency, SVG for logos
5. **Accessibility:** Include proper alt text for all images

## 📁 File Organization

```
public/
├── favicon.ico
├── vite.svg
├── videos/
│   ├── hero-background.mp4
│   ├── automation-demo.mp4
│   └── automation-hero.mp4
├── images/
│   ├── hero-poster.jpg
│   ├── automation/
│   │   ├── lead-qualification-pipeline.png
│   │   ├── customer-onboarding-flow.png
│   │   ├── invoice-processing-bot.png
│   │   ├── discovery.jpg
│   │   ├── development.jpg
│   │   └── monitoring.jpg
│   ├── projects/
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   ├── project3.jpg
│   │   └── project4.jpg
│   ├── insights/
│   │   ├── insight1.jpg
│   │   ├── insight2.jpg
│   │   └── insight3.jpg
│   └── clients/
│       ├── adobe.png
│       ├── microsoft.png
│       ├── google.png
│       ├── amazon.png
│       ├── netflix.png
│       ├── spotify.png
│       ├── nike.png
│       ├── adidas.png
│       ├── coca-cola.png
│       ├── mcdonalds.png
│       ├── samsung.png
│       └── apple.png
```

## 🎯 Priority Assets

**High Priority (Critical for homepage):**
1. Hero background video (`hero-background.mp4`)
2. Hero poster image (`hero-poster.jpg`)
3. Client logos (all 12 logos in `/clients/`)

**Medium Priority (Important for user experience):**
1. Automation screenshots (3 images in `/automation/`)
2. Process phase images (3 images in `/automation/`)
3. Project showcase images (4 images in `/projects/`)

**Low Priority (Nice to have):**
1. Demo videos (2 videos)
2. Insights images (3 images in `/insights/`)
3. App icons and favicon

## 📝 Notes

- All images should be optimized for web delivery
- Videos should be compressed for fast loading
- Maintain consistent visual style across all assets
- Use professional, high-quality imagery
- Ensure all assets are properly licensed for commercial use
- Consider creating placeholder images during development
- Test all assets on different screen sizes and devices