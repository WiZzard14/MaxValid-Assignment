import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, ChevronDown, User, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../utils/AuthContext";
import { logoutUser } from "../utils/firebase";
import { useLanguage } from "../utils/LanguageContext";

export default function PublicLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin } = useAuth();
  
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const navLinks = [
    { titleEN: "Home", titleBN: "হোম", path: "/" },
    { 
      titleEN: "Causes", titleBN: "কারণসমূহ", path: "/causes", 
      dropdownEN: ["Disaster Relief", "Education", "Health", "Water"],
      dropdownBN: ["দুর্যোগ ত্রাণ", "শিক্ষা", "স্বাস্থ্য", "জল"]
    },
    { titleEN: "Events", titleBN: "ইভেন্ট", path: "/events" },
    { 
      titleEN: "About Us", titleBN: "আমাদের সম্পর্কে", path: "/about", 
      dropdownEN: ["Our Story", "Team", "Careers", "Contact"],
      dropdownBN: ["আমাদের গল্প", "দল", "ক্যারিয়ার", "যোগাযোগ"]
    },
    { titleEN: "Gallery", titleBN: "গ্যালারি", path: "/gallery" },
    { 
      titleEN: "News & Articles", titleBN: "খবর ও আর্টিকেল", path: "/blog", 
      dropdownEN: ["Latest News", "Press Releases", "Blog"],
      dropdownBN: ["সর্বশেষ খবর", "প্রেস বিজ্ঞপ্তি", "ব্লগ"]
    },
    { titleEN: "Partnership", titleBN: "অংশীদারিত্ব", path: "/partnership" }
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path || (item.path === "/" && location.pathname === "/home");
    const title = language === "EN" ? item.titleEN : item.titleBN;
    const dropdown = language === "EN" ? item.dropdownEN : item.dropdownBN;
    
    return (
      <div 
        className="relative h-full flex items-center"
        onMouseEnter={() => setActiveDropdown(title)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <Link 
          to={item.path}
          className={`hover:text-white transition-colors flex items-center gap-1 py-1 relative ${isActive ? "text-white font-semibold" : "text-gray-300 font-medium"}`}
        >
          {title} {dropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === title ? "rotate-180" : ""}`} />}
          {isActive && (
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 -bottom-1 h-[2px] bg-white origin-left" 
            />
          )}
        </Link>
        {dropdown && (
          <AnimatePresence>
            {activeDropdown === title && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-[100%] left-0 pt-4 z-50"
              >
                <div className="w-48 bg-white rounded-md shadow-xl py-2 border border-gray-100 relative before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-4">
                  {dropdown.map((dropItem, idx) => (
                    <Link 
                      key={idx} 
                      to={`${item.path}?filter=${encodeURIComponent(dropItem)}`} 
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {dropItem}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#f8f9fa]">
      <div className="relative text-white h-[450px] flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-[#0b1329]/70 mix-blend-multiply"></div>
        
        <nav className="relative z-50 w-full max-w-[1400px] mx-auto mt-6 px-4">
          <div className="bg-[#1f232b]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Box className="text-[#0b1329]" size={20} />
              </div>
              <div className="text-xl font-bold tracking-tight text-white hidden sm:block">MaxValid</div>
            </Link>
            
            <div className="hidden lg:flex gap-6 items-center text-sm">
              {navLinks.map((link, idx) => (
                <NavItem key={idx} item={link} />
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
              <div className="flex bg-white/10 rounded-full overflow-hidden p-1 shadow-inner border border-white/5 cursor-pointer">
                <button 
                  onClick={() => setLanguage("EN")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${language === 'EN' ? "bg-white text-[#00a8ff] shadow-sm font-bold" : "text-gray-300 hover:bg-white/10"}`}
                >EN</button>
                <button 
                  onClick={() => setLanguage("BN")}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${language === 'BN' ? "bg-white text-[#00a8ff] shadow-sm font-bold" : "text-gray-300 hover:bg-white/10"}`}
                >BN</button>
              </div>
              
              {user ? (
                <div 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown("User")}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#00a8ff] flex items-center justify-center">
                        <User size={14} className="text-white" />
                      </div>
                    )}
                    <span className="font-medium text-gray-200">{user.displayName || "User"}</span>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === "User" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-[100%] right-0 pt-4"
                      >
                        <div className="w-48 bg-white rounded-md shadow-xl py-2 border border-gray-100 relative before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4">
                          <div className="px-4 py-2 border-b border-gray-100 mb-1">
                            <p className="text-sm font-bold text-gray-800">{user.displayName || "User"}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <Link to="/user/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                            <User size={16} /> {t("User Dashboard", "ইউজার ড্যাশবোর্ড")}
                          </Link>
                          {isAdmin && (
                            <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                              <LayoutDashboard size={16} /> {t("Admin Dashboard", "অ্যাডমিন ড্যাশবোর্ড")}
                            </Link>
                          )}
                          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut size={16} /> {t("Sign Out", "লগআউট")}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="px-5 py-2 border border-white/30 text-gray-200 rounded-full hover:bg-white/10 hover:text-white transition-all font-semibold">
                  {t("Sign In", "লগইন")}
                </Link>
              )}
              
              <Link to="/donate" className="px-6 py-2 bg-[#00a8ff] text-white rounded-full hover:bg-[#0097e6] transition-all font-bold shadow-lg block">
                {t("Donate", "দান করুন")}
              </Link>
            </div>

            <button className="lg:hidden text-white hover:text-blue-200 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={28} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-[80px] left-4 right-4 bg-white rounded-2xl p-4 flex flex-col gap-2 shadow-2xl z-40 overflow-hidden border border-gray-100"
            >
              <div className="flex bg-gray-100 rounded-full overflow-hidden p-1 mb-2 self-start">
                <button onClick={() => setLanguage("EN")} className={`px-4 py-1 rounded-full text-xs shadow-sm font-bold ${language === 'EN' ? 'bg-white text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}>EN</button>
                <button onClick={() => setLanguage("BN")} className={`px-4 py-1 rounded-full text-xs shadow-sm font-bold ${language === 'BN' ? 'bg-white text-blue-600' : 'text-gray-500 hover:bg-gray-200'}`}>BN</button>
              </div>
              
              {navLinks.map((link, idx) => (
                <Link key={idx} to={link.path} onClick={() => setIsMenuOpen(false)} className={`font-medium px-2 py-2 rounded-lg ${location.pathname === link.path ? 'text-blue-600 bg-blue-50 font-bold' : 'text-gray-700 hover:bg-blue-50'}`}>
                  {language === 'EN' ? link.titleEN : link.titleBN}
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2"></div>
              {user ? (
                <>
                  <div className="px-2 py-2 flex items-center gap-3">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-gray-800">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/user/dashboard" className="text-gray-700 font-medium px-2 py-2 hover:bg-blue-50 rounded-lg flex items-center gap-2">
                    <User size={16} /> {t("User Dashboard", "ইউজার ড্যাশবোর্ড")}
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="text-gray-700 font-medium px-2 py-2 hover:bg-blue-50 rounded-lg flex items-center gap-2">
                      <LayoutDashboard size={16} /> {t("Admin Dashboard", "অ্যাডমিন ড্যাশবোর্ড")}
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-red-600 font-medium px-2 py-2 hover:bg-red-50 rounded-lg flex items-center gap-2 text-left">
                    <LogOut size={16} /> {t("Sign Out", "লগআউট")}
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 font-medium px-2 py-2 hover:bg-blue-50 rounded-lg">{t("Sign In", "লগইন")}</Link>
              )}
              <Link to="/donate" onClick={() => setIsMenuOpen(false)} className="w-full mt-2 py-3 bg-[#00a8ff] text-white rounded-xl font-bold shadow-md text-center block">
                {t("Donate", "দান করুন")}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <motion.h1 
            key={location.pathname + location.search + language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-wide capitalize"
          >
            {location.search.includes("filter=") ? decodeURIComponent(location.search.split("=")[1]) : (location.pathname === '/' ? t("Home", "হোম") : location.pathname.substring(1).replace("-", " "))}
          </motion.h1>
        </div>
      </div>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-[#172033] text-gray-400 py-12 mt-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">MaxValid</div>
            <p className="max-w-xs text-sm mx-auto md:mx-0">{t("Empowering the world through knowledge, one article at a time.", "জ্ঞানের মাধ্যমে বিশ্বকে ক্ষমতায়ন, একবারে একটি প্রবন্ধ।")}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t("Company", "কোম্পানি")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">{t("About Us", "আমাদের সম্পর্কে")}</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">{t("Careers", "ক্যারিয়ার")}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t("Contact", "যোগাযোগ")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">{t("Legal", "আইনগত")}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="hover:text-white transition-colors">{t("Terms of Service", "সেবার শর্তাবলী")}</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t("Privacy Policy", "গোপনীয়তা নীতি")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} MaxValid. {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
        </div>
      </footer>
    </div>
  );
}
