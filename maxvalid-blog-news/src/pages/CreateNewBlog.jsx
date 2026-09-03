import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image as ImageIcon, X, UploadCloud } from "lucide-react";
import AdminLayout from "../components/admin/AdminLayout";
import { motion, AnimatePresence } from "motion/react";
import { addPost } from "../utils/storage";
import toast from "react-hot-toast";

export default function CreateNewBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
  });
  const [errors, setErrors] = useState({});
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be smaller than 5MB");
        return;
      }
      setSelectedImage(URL.createObjectURL(file));
      setIsUploadOpen(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Content Title is required.";
    if (!formData.body.trim()) newErrors.body = "Content Body is required.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formData.body;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    
    try {
      await addPost({
        title: formData.title,
        body: formData.body,
        excerpt: plainText.substring(0, 150) + (plainText.length > 150 ? "..." : ""),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        category: formData.tags ? formData.tags.split(",")[0].trim() : "Updates",
        image: selectedImage || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        featured: false,
        sourceLink: "#"
      });
      toast.success("Content published successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error creating post", error);
      toast.error("Failed to create post. Check console for details.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-gray-500 mb-4">
          Dashboard &gt; Content Management &gt; Create New Blog & News
        </div>
        
        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="titleInput" className="block text-sm font-medium text-gray-700 mb-1">
                Content Title <span className="text-red-500">*</span>
              </label>
              <input
                id="titleInput"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Type here..."
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.title ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:ring-blue-100"
                }`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content Body <span className="text-red-500">*</span>
              </label>
              <div className={`border rounded-md overflow-hidden bg-white ${errors.body ? "border-red-500" : "border-gray-200"}`}>
                <div className="bg-gray-50 p-2 border-b border-gray-200 flex gap-2">
                  <button 
                    type="button" 
                    aria-label="Bold text"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => document.execCommand('bold', false, null)}
                    className="font-bold text-gray-600 px-3 py-1 hover:bg-gray-200 rounded"
                  >
                    B
                  </button>
                  <button 
                    type="button"
                    aria-label="Italic text"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => document.execCommand('italic', false, null)} 
                    className="italic text-gray-600 px-3 py-1 hover:bg-gray-200 rounded"
                  >
                    I
                  </button>
                  <button 
                    type="button"
                    aria-label="Underline text"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => document.execCommand('underline', false, null)} 
                    className="underline text-gray-600 px-3 py-1 hover:bg-gray-200 rounded"
                  >
                    U
                  </button>
                </div>
                <div
                  contentEditable
                  aria-label="Content Body"
                  className="w-full p-4 min-h-[200px] focus:outline-none focus:bg-blue-50/10"
                  onInput={(e) => {
                    const newHtml = e.currentTarget.innerHTML;
                    if (formData.body !== newHtml) {
                      setFormData(prev => ({ ...prev, body: newHtml }));
                      if (errors.body) setErrors(prev => ({ ...prev, body: "" }));
                    }
                  }}
                  onBlur={(e) => {
                     if (!e.currentTarget.textContent.trim()) {
                        e.currentTarget.innerHTML = "";
                        setFormData(prev => ({ ...prev, body: "" }));
                     }
                  }}
                />
              </div>
              {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
            </div>

            <div>
              <label htmlFor="tagsInput" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                id="tagsInput"
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Comma separated tags"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
              {selectedImage ? (
                <div className="relative w-48 h-32 rounded-md overflow-hidden border border-gray-200">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    aria-label="Remove image"
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm text-red-500 hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
                >
                  <ImageIcon size={20} />
                  <span>Choose Image</span>
                </button>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Link
                to="/admin/blogs"
                className="px-6 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Content
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="font-semibold text-lg text-gray-800">Upload Image</h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  aria-label="Close upload modal"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div 
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-100 transition-colors"
                >
                  <UploadCloud size={48} className="text-gray-400 mb-4" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Choose a file or drag & drop it here
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    JPEG, PNG, WebP up to 5MB
                  </p>
                  <div className="relative">
                    <input
                      id="fileUpload"
                      title="Upload Image"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleFileChange(e.target.files?.[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <label htmlFor="fileUpload" className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer block">
                      Browse File
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
