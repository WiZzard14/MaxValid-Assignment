import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminBlogManagement from "./pages/AdminBlogManagement";
import CreateNewBlog from "./pages/CreateNewBlog";
import PublicBlog from "./pages/PublicBlog";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import SettingManagement from "./pages/SettingManagement";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import Causes from "./pages/Causes";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import Gallery from "./pages/Gallery";
import Partnership from "./pages/Partnership";
import Donate from "./pages/Donate";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { LanguageProvider } from "./utils/LanguageContext";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = () => {
  const { user, isAdmin } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/user/dashboard" replace />; // Redirect non-admins to user dashboard
  }
  
  return <Outlet />;
};

const UserProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<PublicBlog />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<UserProtectedRoute />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/settings" element={<SettingManagement />} />
            <Route path="/admin/blogs" element={<AdminBlogManagement />} />
            <Route path="/admin/blogs/new" element={<CreateNewBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;