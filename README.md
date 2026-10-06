# 🚀 Futuristic Modular Interspace Portfolio

A stunning, cinematic portfolio website that feels like navigating a digital interspace. Built with React, Three.js, and cutting-edge web technologies.

![Portfolio Preview](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🎬 Cinematic 3D Experience
- **Infinite Digital Space**: Navigate through a stunning 3D environment with particle fields and animated grids
- **Dynamic Lighting**: Mouse-reactive lighting system that follows your cursor
- **Floating Background Shapes**: Animated 3D objects that create depth and atmosphere
- **GPU-Accelerated Animations**: Smooth 60 FPS performance using requestAnimationFrame

### 🧩 Modular Card System
Five distinct floating cards suspended in 3D space:
1. **Hero Card** - Introduction with parallax tilt effects
2. **Projects Card** - Showcase of featured work with glowing project tiles
3. **Skills Card** - Tech stack visualization with progress bars
4. **Experience Card** - Timeline-style career history
5. **Contact Card** - Interactive contact form with glassmorphism

### 🖱️ Cursor-Reactive Environment
- **Parallax Effects**: Cards tilt based on mouse position
- **Dynamic Glow**: Light intensity adjusts to cursor proximity
- **Custom Cursor**: Cinematic crosshair cursor with hover states
- **Particle Interaction**: Background particles respond to mouse movement

### 🎯 Navigation Systems
- **Scroll Navigation**: Smooth camera transitions between cards
- **Keyboard Controls**: Arrow keys for quick navigation
- **Click Interaction**: Direct card selection via sidebar menu
- **Drag to Rotate**: Interactive 3D scene rotation

### 🎨 Glassmorphism UI
- Semi-transparent frosted glass effects
- Neon edges (cyan, electric blue, violet)
- Soft reflections and dynamic glow
- Premium color palette with gradient accents

### 📱 Responsive Design
- **Desktop Mode**: Full 3D immersive experience
- **Mobile Mode**: Optimized 2D layout with touch gestures
- **Progressive Enhancement**: Graceful fallbacks for older devices
- **Performance Optimized**: Lazy loading and efficient rendering

## 🛠️ Tech Stack

### Core
- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language

### 3D & Animation
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for R3F
- **Framer Motion** - Advanced animation library
- **GSAP** - Professional-grade animations

### UI/UX
- **Lucide React** - Beautiful icon system
- **Custom CSS** - Vanilla CSS with design tokens
- **Google Fonts** - JetBrains Mono & Inter typography

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd PORTFOLIO
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure admin authentication** (optional)

Copy `.env.example` to `.env.local` and set a unique, strong `ADMIN_PASSWORD` and an `ADMIN_SESSION_SECRET` with at least 32 bytes of random data (for example, generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"`). Keep `.env.local` private and never use a `VITE_` prefix for these values. The same variables must be configured in the Vercel project's server-side Environment Variables.

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
Navigate to `http://localhost:5173`

The Vite dev server and preview server provide local versions of the `/api/admin/*` authentication routes. On Vercel, those routes run as serverless functions. Without the environment variables, admin login is unavailable.

Admin authentication only controls the client UI. Portfolio edits are still stored in each visitor's browser `localStorage`; they are not sent to or protected by a server. Do not treat this UI gate as authorization for shared or persistent data.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
PORTFOLIO/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── SpaceEnvironment.jsx    # 3D particles, grid, lighting
│   │   ├── FloatingCards.jsx       # All card components
│   │   └── MobileView.jsx          # Mobile-optimized view
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles & design system
├── index.html             # HTML entry point
├── package.json           # Dependencies & scripts
└── vite.config.js         # Vite configuration
```

## 🎨 Design System

### Color Palette
```css
--color-primary-cyan: #00f0ff     /* Main accent */
--color-primary-blue: #0066ff     /* Secondary accent */
--color-primary-violet: #8800ff   /* Tertiary accent */
--color-accent-pink: #ff00aa      /* Highlight */
--color-accent-gold: #ffd700      /* Special elements */
```

### Typography
- **Headings**: JetBrains Mono (Monospace)
- **Body**: Inter (Sans-serif)
- **Responsive scaling**: clamp() functions for fluid typography

### Effects
- **Glassmorphism**: backdrop-filter with blur
- **Neon Glow**: box-shadow with color-matching
- **Smooth Transitions**: cubic-bezier easing
- **3D Transforms**: perspective and rotations

## 🎮 User Interactions

### Desktop Experience
- **Mouse Move**: Parallax effects and dynamic lighting
- **Scroll**: Navigate between card sections
- **Arrow Keys**: Quick section switching
- **Drag**: Rotate the 3D scene
- **Hover**: Card lift and glow effects
- **Click**: Select and interact with cards

### Mobile Experience
- **Swipe**: Scroll through sections
- **Tap**: Open navigation menu
- **Touch**: Interactive form elements
- **Simplified Animations**: Reduced motion for performance

## ⚡ Performance Optimizations

- **GPU Acceleration**: CSS transforms and will-change
- **Lazy Loading**: Suspense boundaries for 3D components
- **Code Splitting**: Dynamic imports where appropriate
- **Optimized Particles**: Efficient BufferGeometry usage
- **Debounced Events**: Scroll and resize throttling
- **Mobile Detection**: Conditional rendering for devices

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

WebGL support required for 3D features.

## 📝 Customization Guide

### Update Personal Information

**Hero Card** (`src/components/FloatingCards.jsx`):
```javascript
// Line ~40
<h1 className="heading-1">Your Name</h1>
<div className="caption">YOUR TITLE</div>
```

**Projects** (`src/components/FloatingCards.jsx`):
```javascript
// Line ~80
const projects = [
  { title: "Your Project", description: "...", tech: [...] }
]
```

**Skills** (`src/components/FloatingCards.jsx`):
```javascript
// Line ~150
const skillCategories = [
  { category: "Frontend", skills: [...] }
]
```

### Change Color Scheme

Edit `src/index.css` root variables:
```css
:root {
  --color-primary-cyan: #YOUR_COLOR;
  --color-primary-blue: #YOUR_COLOR;
  /* ... */
}
```

### Adjust Particle Density

In `src/components/SpaceEnvironment.jsx`:
```javascript
<ParticleField count={3000} /> // Default: 5000
```

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📱 Mobile Responsiveness

The application automatically detects screen size and switches between:
- **Desktop (>768px)**: Full 3D immersive experience
- **Mobile (≤768px)**: Optimized 2D scrolling layout

## 🌟 Key Highlights

- ✅ **Fully Functional**: All cards populated with real data
- ✅ **Mouse Integration**: Complete cursor interactivity
- ✅ **Cinematic Animations**: Physics-based motion design
- ✅ **Production Ready**: Optimized build and performance
- ✅ **SEO Optimized**: Proper meta tags and semantic HTML
- ✅ **Accessible**: Keyboard navigation support
- ✅ **Modern Stack**: Latest React and Three.js versions

## 🎓 Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🙏 Credits

Created with ❤️ using cutting-edge web technologies.

- Design inspiration: Futuristic UI/UX patterns
- Icons: Lucide React
- Fonts: Google Fonts (JetBrains Mono, Inter)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy 'dist' folder to gh-pages branch
```

---

**Built with React + Three.js + Passion** 🚀✨

For questions or support, feel free to reach out!
#   p o r t f o l i o  
 