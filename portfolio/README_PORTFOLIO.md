# Christopher Bratkovics - AI/ML Engineer Portfolio

## 🚀 Portfolio Overview

A stunning, production-ready portfolio website showcasing your transition from Data Science to AI Engineering with emphasis on production ML systems.

### ✨ Features Implemented

1. **Hero Section**
   - Animated metrics dashboard showing real production stats
   - Gradient text effects and glassmorphism design
   - Smooth scroll indicators

2. **Interactive Skills Matrix**
   - Categorized skills with hover effects
   - Visual grouping by expertise area
   - Production-focused narrative

3. **Project Showcase**
   - 5 major ML projects with real metrics
   - Performance improvements visualization
   - Tech stack badges
   - Architecture patterns highlighted

4. **Impact Metrics**
   - Animated counters for key achievements
   - 1.2M+ predictions served
   - 67% cost savings
   - Deployment time reduction from weeks to hours

5. **Contact Section**
   - Professional contact form
   - Social links (GitHub, LinkedIn, Email)
   - Resume download option
   - Calendar scheduling integration

6. **Visual Effects**
   - Three.js particle animations
   - Glassmorphism throughout
   - Gradient animations
   - Smooth scrolling navigation
   - Cyberpunk/tech aesthetic

## 🛠 Tech Stack

- **Frontend:** Next.js 14, TypeScript, React
- **Styling:** Tailwind CSS, Custom CSS animations
- **3D/Animations:** Three.js, Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts

## 📂 Project Structure

```
portfolio/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── Hero.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Metrics.tsx
│   ├── Contact.tsx
│   ├── Navigation.tsx
│   └── Particles.tsx
├── data/            # Project data
│   └── projects.ts
├── lib/             # Utility functions
└── public/          # Static assets
```

## 🚀 Getting Started

### Development Server

```bash
npm run dev
# or
npm run dev -- --port 3001
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### Build for Production

```bash
npm run build
npm run start
```

## 📱 Features & Highlights

### Performance Optimized
- Lazy loading for 3D components
- Optimized animations
- SEO-ready with proper meta tags
- Mobile-responsive design

### Production ML Focus
- Emphasizes MLOps and production deployment
- Real metrics from actual projects
- System design and architecture highlighted
- Performance improvements quantified

### Interactive Elements
- Hover effects on all cards
- Animated counters
- Smooth section transitions
- Particle effects in background

## 🎨 Customization

### Update Projects
Edit `data/projects.ts` to modify project information.

### Change Colors
Modify gradient colors in `app/globals.css`:
- Primary gradient: `#667eea` to `#00f2fe`
- Glassmorphism effects
- Neon glow colors

### Add Resume
Place your PDF resume in `public/resume.pdf` for the download button.

## 📋 Next Steps

1. **Add Resume PDF**: Place your resume at `public/resume.pdf`
2. **Update Calendar Link**: Update Calendly link in Contact component
3. **Deploy to Vercel**: 
   ```bash
   npm install -g vercel
   vercel
   ```
4. **Custom Domain**: Configure your domain in Vercel settings

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy with one click

### Deploy to GitHub Pages
Since you have cbratkovics.github.io:
1. Build the static export
2. Configure GitHub Pages
3. Push to repository

## 📈 SEO & Performance

- **Lighthouse Score Target:** 95+
- **Meta Tags:** Complete OpenGraph and Twitter cards
- **Structured Data:** Ready for search engines
- **Performance:** Optimized for Core Web Vitals

## 🔧 Troubleshooting

If you encounter issues:
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node version: Requires Node.js 18+

## 📞 Support

For any issues or questions about the portfolio, feel free to reach out!

---

**Built with passion for Production ML Engineering** 🚀