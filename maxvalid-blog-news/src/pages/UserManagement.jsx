import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { Plus, MoreVertical, Shield, User as UserIcon, Search, Trash2, Edit } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: i % 3 === 0 ? `Admin User ${i}` : `Staff User ${i}`,
      email: `user${i+1}@maxvalid.com`,
      role: i % 3 === 0 ? "Admin" : "Editor",
      status: i % 5 === 0 ? "Inactive" : "Active"
    }))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Stores the user being added or edited
  const [currentUser, setCurrentUser] = useState(null);

  const itemsPerPage = 5;

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setOpenMenuId(null);
  };

  const handleOpenAdd = () => {
    setCurrentUser({ id: null, name: "", email: "", role: "Editor", status: "Active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setCurrentUser({ ...user });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!currentUser.name || !currentUser.email) return;

    if (currentUser.id) {
      // Edit existing user
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    } else {
      // Add new user
      setUsers([{ ...currentUser, id: Date.now() }, ...users]);
    }
    
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Dashboard &gt; User Management</div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
            >
              <Plus size={20} />
              <span className="font-medium">Add New User</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Users"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-visible">
          <div className="overflow-x-visible">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">User Name</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Email Address</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Role</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Status</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 border-b border-gray-100 last:border-0 relative">
                      <td className="px-6 py-4 font-medium text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-gray-700">
                          {user.role === "Admin" ? <Shield size={14} className="text-blue-500" /> : <UserIcon size={14} className="text-gray-400" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="text-gray-400 hover:text-gray-600 relative"
                        >
                          <MoreVertical size={20} />
                        </button>
                        {openMenuId === user.id && (
                          <div className="absolute right-6 top-10 w-36 bg-white border border-gray-100 shadow-xl rounded-md z-50 py-1 overflow-hidden">
                            <button 
                              onClick={() => handleOpenEdit(user)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit size={14} /> Edit User
                            </button>
                            <button 
                              onClick={() => handleDelete(user.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-50"
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
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 0 && (
          <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
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

      {isModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">{currentUser.id ? "Edit User" : "Add New User"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
            </div>
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                <input type="text" value={currentUser.name} onChange={e => setCurrentUser({...currentUser, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={currentUser.email} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={currentUser.role} onChange={e => setCurrentUser({...currentUser, role: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Author">Author</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={currentUser.status} onChange={e => setCurrentUser({...currentUser, status: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 shadow-sm">{currentUser.id ? "Update User" : "Save User"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
