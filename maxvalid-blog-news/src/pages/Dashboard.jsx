import { useState, useEffect } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { getPosts } from "../utils/storage";
import { FileText, Tag, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, categories: 0, featured: 0 });
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const posts = getPosts();
    const uniqueCats = new Set(posts.map(p => p.category)).size;
    const featuredCount = posts.filter(p => p.featured).length;

    setStats({ total: posts.length, categories: uniqueCats, featured: featuredCount });
    setRecentPosts(posts.slice(0, 4));
  }, []);

  const cards = [
    { title: "Total Articles", value: stats.total, icon: <FileText size={24} className="text-blue-500" />, color: "bg-blue-50" },
    { title: "Categories", value: stats.categories, icon: <Tag size={24} className="text-purple-500" />, color: "bg-purple-50" },
    { title: "Featured Posts", value: stats.featured, icon: <TrendingUp size={24} className="text-emerald-500" />, color: "bg-emerald-50" },
    { title: "Active Users", value: 1, icon: <Users size={24} className="text-orange-500" />, color: "bg-orange-50" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back to the MaxValid Admin Panel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`p-4 rounded-full ${card.color}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recently Added Content</h2>
          <div className="divide-y divide-gray-100">
            {recentPosts.map((post) => (
              <div key={post.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{post.date} &bull; <span className="text-blue-500">{post.category}</span></p>
                </div>
                <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                  Published
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
