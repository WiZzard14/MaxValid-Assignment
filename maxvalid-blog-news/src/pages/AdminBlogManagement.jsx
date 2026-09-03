import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreVertical, ExternalLink, Trash2, Edit } from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import { getPosts, deletePost, updatePost } from "../utils/storage";
import toast from "react-hot-toast";

export default function AdminBlogManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editPost, setEditPost] = useState(null);
  
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post.id !== id));
        toast.success("Content deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete content");
      }
    }
    setOpenMenuId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editPost) return;
    try {
      await updatePost(editPost.id, editPost);
      setPosts(posts.map(p => p.id === editPost.id ? editPost : p));
      setEditPost(null);
      toast.success("Content updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update content");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="text-sm text-gray-500 mb-1">
            Dashboard &gt; Content Management
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Blog & News Management</h1>
            <Link
              to="/admin/blogs/new"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              <span className="font-medium">Create New Content</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Content"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Content Title</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Published Date</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Source Link</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50/50 border-b border-gray-100 last:border-0">
                      <td className="px-6 py-4 font-medium text-gray-800">{post.title}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-800">{post.date}</div>
                        <div className="text-xs text-gray-400 mt-1">10:30 AM</div>
                      </td>
                      <td className="px-6 py-4">
                        {post.sourceLink && post.sourceLink !== "#" ? (
                          <a 
                            href={post.sourceLink.startsWith('http') ? post.sourceLink : `https://${post.sourceLink}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-blue-500 hover:text-blue-600"
                            title="Visit Source"
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span className="text-gray-300" title="No source link provided">
                            <ExternalLink size={16} />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical size={20} />
                        </button>
                        {openMenuId === post.id && (
                          <div className="absolute right-6 top-10 w-32 bg-white border border-gray-100 shadow-md rounded-md z-10 py-1 overflow-hidden">
                            <button 
                              onClick={() => { setEditPost(post); setOpenMenuId(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No contents found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>Page {currentPage} of {totalPages}</div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded ${
                    currentPage === page 
                      ? 'bg-blue-500 text-white font-medium' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
              >
                &gt;
              </button>
            </div>
            <div>
              <span className="text-gray-400 border border-gray-200 rounded px-2 py-1 text-xs">{itemsPerPage} / Page</span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative my-8">
            <h3 className="text-xl font-bold mb-4">Edit Content</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editPost.title || ""}
                  onChange={(e) => setEditPost({...editPost, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editPost.category || ""}
                    onChange={(e) => setEditPost({...editPost, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editPost.image || ""}
                    onChange={(e) => setEditPost({...editPost, image: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (HTML/Text)</label>
                <textarea
                  value={editPost.body || editPost.excerpt || ""}
                  onChange={(e) => setEditPost({...editPost, body: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 h-40"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditPost(null)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
