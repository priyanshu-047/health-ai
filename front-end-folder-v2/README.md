# Health-AI Assistant Frontend v2

A modern, minimal, and production-ready React frontend for the Health-AI Assistant project. This application provides AI-powered health guidance with a clean, responsive interface.

## 🚀 Features

- **Modern React Stack**: Built with React 18, Vite, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Three Main Pages**:
  - Landing Page (Marketing & entry point)
  - Health Analyzer (Main feature with AI analysis)
  - History Page (Track previous health analyses)
- **API Integration**: Connects to Spring Boot backend with Axios
- **UI/UX Features**:
  - Loading states with spinners
  - Toast notifications
  - Smooth animations and transitions
  - Reusable component library
  - Dark mode ready (configurable)

## 🛠️ Tech Stack

- **React 18** with functional components & hooks
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router DOM** for client-side routing
- **Axios** for HTTP requests
- **React Hot Toast** for notifications

## 📁 Project Structure

```
front-end-folder-v2/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── Card.jsx        # Card component with variants
│   │   └── Loader.jsx      # Loading spinners & skeletons
│   ├── pages/              # Page components
│   │   ├── Landing.jsx     # Landing/marketing page
│   │   ├── Analyzer.jsx    # Health analysis form & results
│   │   └── History.jsx     # Analysis history page
│   ├── services/           # API services
│   │   └── api.js          # Axios configuration & API calls
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles & Tailwind
├── public/                 # Static assets
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── index.html              # HTML template
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd front-end-folder-v2
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file (optional):
   ```bash
   cp .env.example .env
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔌 API Integration

The frontend connects to a Spring Boot backend at `http://localhost:8080` by default.

### API Endpoints

- `POST /api/health/analyze` - Analyze health symptoms
- `GET /api/health/history` - Get analysis history

### Mock Mode

If the backend is not available, the app uses mock data for demonstration. This can be configured in `src/services/api.js`.

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Secondary**: Green gradient (`#22c55e` to `#16a34a`)
- **Background**: Light gray (`#f9fafb`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300 (Light) to 700 (Bold)

### Components
- **Cards**: Rounded corners (2xl), subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Forms**: Clean inputs with focus states
- **Alerts**: Color-coded for different severity levels

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🧪 Testing

Run the development server and test the following:

1. **Navigation**: Click through all routes
2. **Form Validation**: Try submitting empty forms
3. **Responsive Design**: Resize browser window
4. **API Integration**: Test with backend running

## 🚫 Constraints & Decisions

- **No Redux**: Using React hooks for state management
- **No Heavy Libraries**: Keeping bundle size minimal
- **Performance**: Lazy loading for pages, optimized images
- **Accessibility**: Semantic HTML, ARIA labels where needed

## 📄 License

This project is for demonstration purposes as part of the Health-AI Assistant project.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues or questions, please check the project documentation or create an issue in the repository.