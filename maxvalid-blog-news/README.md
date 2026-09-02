# MaxValid Blog & News Platform

## 🚀 Project Overview
A fully functional, responsive, and accessible full-stack web application for managing and displaying blogs, news, and community events. Developed as an internship assignment for MaxValid.

## ✨ Features
- **Real-time Database:** Powered by Firebase Firestore for persistent data storage across sessions.
- **Google Authentication:** Secure Firebase OAuth login restricted to specific admin roles.
- **Public Blog Page:** Responsive layout with hero banner, category filter, dynamic search, and interactive full-screen article modal.
- **Admin Dashboard:** Management table with search, pagination, dynamic Edit, and Delete functionalities.
- **Create Content Form:** Form validation, Rich text body editor, and drag & drop image upload with 5MB validation limit.
- **Fluid Animations:** Subtle interactions using Motion for React.
- **Accessibility:** Fully keyboard navigable (tabIndex, onKeyDown) and screen-reader friendly (aria-labels).
- **Responsive Design:** Optimized for Desktop, Tablet, and Mobile views, including a mobile hamburger menu for the Admin panel.

## 💻 Technology Stack
- **Frontend Framework:** React 19 (Vite)
- **Backend Services:** Firebase (Auth & Firestore)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Motion for React
- **Deployment:** Vercel

## 📦 Installation Command
```bash
npm install
```

## 🚀 How to run locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

## 📁 Project Structure
```text
src/
├── components/
│   ├── admin/      # Admin layout & mobile navigation
│   └── public/     # Public components (Layouts)
├── pages/          # Application views (Public, Admin, Create, Login)
├── utils/          # Storage, Firebase config, AuthContext
├── App.jsx         # Routing configuration & Route Protection
└── main.jsx        # Entry point
```

## 🌐 Live Demo Link
👉 **[Insert your Vercel URL here after deployment]**

## 📸 Screenshots
### Public Blog View
*(Upload a screenshot here on GitHub: `![Public Blog View](./docs/public-blog.png)`)*

### Admin Dashboard View
*(Upload a screenshot here on GitHub: `![Admin Dashboard](./docs/admin-dashboard.png)`)*

## 📱 Responsive Support
- **Mobile (320px - 425px):** Full-width search, compact navbar, stacked grid, hidden sidebar behind hamburger menu.
- **Tablet (768px):** 2-column content layout.
- **Desktop (1024px+):** 3-column article grid and comprehensive admin layouts.

## 🎨 Animation Details
- Fade-in and scale on page loads.
- Hover lift effect on article cards with layout persistence.
- Modal fade and scale interactions for Auth, Lightbox, and Article reading.
