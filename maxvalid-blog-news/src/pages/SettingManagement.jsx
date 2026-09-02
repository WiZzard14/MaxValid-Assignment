import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { Save } from "lucide-react";

export default function SettingManagement() {
  const [settings, setSettings] = useState({
    siteName: "MaxValid Blog & News",
    adminEmail: "admin@maxvalid.com",
    seoDescription: "Empowering the world through knowledge, one article at a time.",
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Dashboard &gt; Setting Management</div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Admin Email</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Meta Description</label>
              <textarea
                rows={4}
                value={settings.seoDescription}
                onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Save size={18} />
                <span className="font-medium">Save Settings</span>
              </button>
              {isSaved && <span className="text-green-600 font-medium text-sm">Settings saved successfully!</span>}
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
