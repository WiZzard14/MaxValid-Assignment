import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Box, Menu, X } from "lucide-react";
import { useAuth } from "../../utils/AuthContext";
import { logoutUser } from "../../utils/firebase";
import { motion, AnimatePresence } from "motion/react";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "User Management", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Blog & News Management", path: "/admin/blogs", icon: <FileText size={20} /> },
    { name: "Setting Management", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const SidebarContent = () => (
    <>
      <Link to="/" className="p-6 border-b border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-colors">
        <Box className="text-blue-500" size={28} />
        <span className="font-bold text-gray-800 text-lg">MaxValid</span>
      </Link>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path) && item.path !== "#";
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-4">
        <button 
          onClick={handleLogout}
          aria-label="Log out"
          className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log out</span>
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.displayName?.charAt(0) || "A"}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-800">{user?.displayName || "Super Admin"}</p>
            <p className="text-xs text-gray-500 truncate w-32">{user?.email || "admin@example.com"}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50 flex flex-col md:hidden h-full"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-auto">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center md:hidden sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button aria-label="Open menu" onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600 hover:text-gray-900">
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <Box className="text-blue-500" size={24} />
                <span className="font-bold text-gray-800">MaxValid</span>
              </Link>
            </div>
            <button aria-label="Log out" onClick={handleLogout} className="text-gray-600">
              <LogOut size={20} />
            </button>
        </header>
        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
