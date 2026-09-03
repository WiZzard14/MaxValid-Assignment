# MaxValid Blog & News Portal

A modern, responsive, and fully functional Blog and News Management platform built with React, Tailwind CSS, and Firebase. This project includes a public-facing blog, a user dashboard for saved articles, and a comprehensive Admin Panel for content and user management.

## 🚀 Live Demo
**[https://max-valid-assignment-s2zo.vercel.app/]**

---

## 🔑 Demo Credentials (Admin)
To evaluate the Admin features, you can log in using the following credentials:
- **Email:** `admin@example.com`
- **Password:** `admin123`
> *(Note to developer: Make sure you have created this user in your Firebase Auth and added them to the Firestore `users` collection with the Role set to "Admin")*

---

## ✨ Key Features

### 1. Authentication & Role-Based Access Control (RBAC)
- **Login/Signup:** Supports both standard Email/Password authentication and **Google Login**.
- **Role Detection:** Automatically routes users based on their role (Admin vs. Standard User).
- **Protected Routes:** Admin pages are strictly protected and inaccessible to normal users.

### 2. Public Blog Portal
- **Dynamic Content:** Fetches articles in real-time from Firestore, sorting newest first.
- **Search & Filter:** Instantly search articles by title or filter them by category.
- **Save Articles:** Users can bookmark/save articles to their personal account.
- **Immersive Reading:** Articles open in a beautiful, animated full-screen modal (Framer Motion).

### 3. User Dashboard
- **Personalized View:** Standard users have their own dashboard displaying their name, profile picture, and email.
- **Saved Articles Counter:** Dynamically shows how many articles the user has bookmarked.
- **Edit Profile:** Users can update their Full Name and Profile Picture URL, syncing instantly with Firebase Auth.

### 4. Admin Dashboard
- **Analytics Overview:** Displays total articles, categories, and recently published content.
- **Blog Management (CRUD):** Admins can Create, Read, Update, and Delete blog posts. Includes image URL support and a rich text editor placeholder.
- **User Management (CRUD):** Admins can manually add new users, edit existing roles (Admin, Editor, Author), and update active status.
- **Settings Management:** Multi-language toggle (English/Bengali) implemented seamlessly using Context API.

### 5. UI/UX Enhancements
- **Toast Notifications:** Professional pop-up notifications (React Hot Toast) for all actions (saving, deleting, editing, errors).
- **Smooth Animations:** Built with `motion/react` for fluid page transitions and hover effects.
- **Responsive Design:** 100% Mobile-first and fully responsive across all devices (Tailwind CSS).

---

## 🛠️ Tech Stack
- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS, Lucide React (Icons)
- **Database & Auth:** Firebase (Firestore & Authentication)
- **State Management:** React Context API (AuthContext, LanguageContext)
- **Animations:** Framer Motion
- **Alerts:** React Hot Toast

---

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/WiZzard14/MaxValid-Assignment.git
   cd maxvalid-blog-news
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - The Firebase configuration is located in `src/utils/firebase.js`.
   - Ensure your Firebase Firestore Security Rules are set to Test Mode or allow appropriate read/write access.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:5173`

---

## 📂 Folder Structure Highlights
- `/src/pages` - Contains all main pages (Dashboard, BlogManagement, PublicBlog, etc.)
- `/src/components` - Reusable layout components (AdminLayout, PublicLayout)
- `/src/utils` - Core logic (firebase.js, storage.js, AuthContext.js)
- `/src/data` - Fallback mock data

---
*Developed as part of the MaxValid Assignment.*
