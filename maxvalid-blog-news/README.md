# MaxValid Blog & News Platform

## 📌 Project Overview
A responsive and accessible frontend web application for managing and displaying blogs and news. Developed as an internship assignment for MaxValid.

## ✨ Features
- **Public Blog Page:** Responsive layout with hero banner, category filter, and interactive article grid.
- **Admin Dashboard:** Management table with search and pagination functionalities.
- **Create Content Form:** Form validation and rich image upload modal.
- **Fluid Animations:** Subtle interactions using Motion for React.
- **Responsive Design:** Optimized for Desktop, Tablet, and Mobile views.

## 🛠 Technology Stack
- **Frontend Framework:** React (Vite)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animations:** Motion for React
- **Deployment:** Vercel

## 🚀 Installation Command
```bash
npm install
```

## 💻 How to run locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

## 📂 Project Structure
```text
src/
├── components/
│   ├── admin/      # Admin layout components
│   └── public/     # Public components
├── data/           # Mock data storage
├── pages/          # Application views (Public, Admin, Create)
├── App.jsx         # Routing configuration
└── main.jsx        # Entry point
```

## 🔗 Live Demo Link
[Your Vercel Link Here]

## 📱 Responsive Support
- Mobile (320px - 425px): Full-width search, compact navbar, stacked grid.
- Tablet (768px): 2-column content layout.
- Desktop (1024px+): 3-column article grid and comprehensive admin layouts.

## 🎨 Animation Details
- Fade-in on page load.
- Hover lift effect on article cards.
- Modal fade and scale interactions.

## ⚠️ Known Limitations
- Data is mocked and currently does not persist across hard reloads (No backend API integration).
- Rich text editor toolbar is for visual representation only.
