# Health AI Frontend

A premium, modern frontend for the Health AI platform built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Premium UI/UX Design** - Modern, clean interface with gradient accents and glassmorphism effects
- ⚡ **High Performance** - Optimized with Vite, code splitting, and lazy loading
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🔄 **Real-time API Integration** - Connects to Health AI backend services
- 🧩 **Modular Architecture** - Component-based design for easy maintenance
- 🎯 **Interactive Features** - Symptom checker, health reports, diet planner, and more

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── StatCard.tsx
│   │   ├── HealthChart.tsx
│   │   └── RecentActivity.tsx
│   ├── pages/         # Page components
│   │   ├── Dashboard.tsx
│   │   ├── SymptomChecker.tsx
│   │   ├── HealthReports.tsx
│   │   ├── DietPlanner.tsx
│   │   └── Settings.tsx
│   ├── services/      # API services
│   │   └── api.ts
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#ec4899`)
- **Success**: Green (`#22c55e`)
- **Warning**: Amber (`#f59e0b`)
- **Danger**: Red (`#ef4444`)
- **Secondary**: Pink (`#ec4899`)

### Typography
- **Primary Font**: Inter
- **Display Font**: Poppins

### Components
- Glass cards with backdrop blur
- Gradient buttons with hover effects
- Animated transitions using Framer Motion
- Custom scrollbars

## 🔌 API Integration

The frontend connects to the Health AI backend at `http://localhost:8000` by default. Configure in `.env`:

```env
VITE_API_URL=http://localhost:8000
```

### Available Endpoints
- `POST /api/symptom-check` - Symptom analysis
- `POST /api/report/upload` - Health report upload
- `GET /api/diet/plan` - Diet recommendations
- `GET /api/user/profile` - User profile

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🛠️ Development Tools

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library
- **Framer Motion** - Animations

## 🚀 Deployment

### Build Optimization
- Code splitting with dynamic imports
- Asset optimization (images, fonts)
- Minification and compression
- Tree shaking for unused code

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Drag dist folder to Netlify
```

#### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

## 📄 License

Proprietary - Health AI Platform

## 👥 Team

- **Frontend Architecture**: Premium UI/UX Team
- **Backend Integration**: Health AI Engineering
- **Design System**: Design Team

---

**Health AI Frontend** - Building the future of healthcare technology with premium user experiences.