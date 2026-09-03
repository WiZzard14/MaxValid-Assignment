import { useAuth } from "../utils/AuthContext";
import PublicLayout from "../components/PublicLayout";
import { User, Mail, Calendar, Heart, Bookmark, Award } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../utils/LanguageContext";

import { useState, useEffect } from "react";

export default function UserDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      const saved = JSON.parse(localStorage.getItem(`saved_${user.email}`)) || [];
      setSavedCount(saved.length);
    }
  }, [user]);

  if (!user) return null;

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center md:text-left md:flex items-center gap-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 mx-auto md:mx-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold overflow-hidden ring-4 ring-blue-50">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user.displayName?.charAt(0) || "U"
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mt-4 md:mt-0">{t("Welcome,", "স্বাগতম,")} {user.displayName || "User"}</h1>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-2">
                <Mail size={16} /> {user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{t("My Donations", "আমার অনুদান")}</h3>
              <p className="text-3xl font-black text-gray-900 mt-2">$0.00</p>
              <p className="text-sm text-gray-500 mt-1">{t("No recent donations", "কোনো নতুন অনুদান নেই")}</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                <Bookmark size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{t("Saved Articles", "সেভ করা আর্টিকেল")}</h3>
              <p className="text-3xl font-black text-gray-900 mt-2">{savedCount}</p>
              <p className="text-sm text-gray-500 mt-1">{t("Explore our blog", "আমাদের ব্লগ পড়ুন")}</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{t("Registered Events", "রেজিস্টার করা ইভেন্ট")}</h3>
              <p className="text-3xl font-black text-gray-900 mt-2">0</p>
              <p className="text-sm text-gray-500 mt-1">{t("Join our upcoming events", "আমাদের ইভেন্টে যোগ দিন")}</p>
            </motion.div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-yellow-500" size={24} />
              <h2 className="text-xl font-bold text-gray-900">{t("Recent Activity", "সাম্প্রতিক কাজ")}</h2>
            </div>
            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="text-gray-500">{t("You don't have any recent activity yet.", "আপনার এখনো কোনো কাজ নেই।")}</p>
              <button onClick={() => window.location.href = '/causes'} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-md">
                {t("Explore Causes", "কারণগুলো দেখুন")}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </PublicLayout>
  );
}
