import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Settings, LogOut, Box } from "lucide-react";
import { logout, isAuthenticated } from "../../utils/auth";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = isAuthenticated();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "User Management", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Blog & News Management", path: "/admin/blogs", icon: <FileText size={20} /> },
    { name: "Setting Management", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex h-screen sticky top-0">
        <Link to="/blog" className="p-6 border-b border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-colors">
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
            className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Log out</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.name?.charAt(0) || "S"}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{user?.name || "Super Admin"}</p>
              <p className="text-xs text-gray-500 truncate w-32">{user?.email || "admin@example.com"}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-auto">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center md:hidden">
            <Link to="/blog" className="flex items-center gap-2">
              <Box className="text-blue-500" size={24} />
              <span className="font-bold text-gray-800">MaxValid</span>
            </Link>
            <button onClick={handleLogout} className="text-gray-600">
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
