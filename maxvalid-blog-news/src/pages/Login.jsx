import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginWithGoogle } from "../utils/firebase";
import { useAuth } from "../utils/AuthContext";
import { motion } from "motion/react";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8fb] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage blog & news content</p>
        </div>

        <div className="space-y-5">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <a href="/blog" className="text-sm text-blue-500 hover:underline">Back to Public Site</a>
        </div>
      </motion.div>
    </div>
  );
}
