import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getPosts } from "../utils/storage";
import { motion, AnimatePresence } from "motion/react";
import PublicLayout from "../components/PublicLayout";

export default function PublicBlog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Gallery & Media");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const dummyCategories = [
    "All Gallery & Media", "Blood Donation", "Tree Plantation", "Education & Student Support",
    "Women Empowerment", "Disability Support", "Community Development", "Anti-Drug Awareness",
    "Travel & Tour Management", "Disaster", "Blanket Distribution During Winter", "Iftar Distribution",
    "Winter Clothing Distribution", "Safe Drinking Water", "Qurbani for Everyone", "Food Distribution",
    "Skills Development Training"
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Gallery & Media" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto w-full px-6 py-10 space-y-10">
        
        {/* Full-width Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Blog search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
          />
        </div>
        
        {/* Featured Article */}
        {searchTerm === "" && selectedCategory === "All Gallery & Media" && currentPage === 1 && posts.find(p => p.featured) && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured News & Articles</h2>
            {(() => {
              const featured = posts.find(p => p.featured);
              return (
                <div onClick={() => setSelectedPost(featured)} className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="md:w-[55%] h-64 md:h-auto bg-gray-200 relative">
                    {featured.image && <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover" />}
                  </div>
                  <div className="p-8 md:p-10 md:w-[45%] flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition-colors leading-snug">{featured.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{featured.excerpt}</p>
                    <div className="text-sm text-gray-500">{featured.date}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar (Categories) */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden py-2 shadow-sm">
              <ul className="text-sm text-gray-600">
                {dummyCategories.map(cat => (
                  <li 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                    className={`cursor-pointer px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${
                      selectedCategory === cat ? 'font-medium text-gray-800 border-l-4 border-l-blue-500 bg-gray-50/50' : 'border-l-4 border-l-transparent'
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md flex flex-col cursor-pointer"
                  >
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {post.image && <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#00a8ff] transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                      <div className="text-xs text-gray-400 font-medium">{post.date}</div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full py-12 text-center bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-10">
              <div className="flex items-center gap-1 text-sm">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 disabled:opacity-50"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      currentPage === page 
                        ? 'bg-[#00a8ff] text-white font-medium' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      
      {/* Full Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 z-10 transition-colors"
              >
                &times;
              </button>
              
              <div className="w-full h-64 sm:h-80 relative bg-gray-200">
                {selectedPost.image && <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />}
              </div>
              
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">{selectedPost.category}</span>
                  <span className="text-gray-500 text-sm font-medium">{selectedPost.date}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">{selectedPost.title}</h2>
                
                <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4 text-lg">
                  <p>{selectedPost.excerpt}</p>
                  <p>In a complete system, this area would dynamically fetch the full HTML content from the rich text editor of the admin panel. For this demo, it displays the excerpt expanded.</p>
                </div>
                
                {selectedPost.sourceLink && selectedPost.sourceLink !== "#" && (
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <a href={selectedPost.sourceLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                      Read original source
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
}
