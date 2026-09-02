import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginWithGoogle, loginWithEmail } from "../utils/firebase";
import { useAuth } from "../utils/AuthContext";
import { motion } from "motion/react";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (err) {
      // For demo purposes: If login fails (user doesn't exist), try to auto-create the account!
      try {
        const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
        const { auth } = await import("../utils/firebase");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const nameFromEmail = email.split("@")[0];
        
        await updateProfile(userCredential.user, {
          displayName: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
        });
        
        navigate("/");
      } catch (signupErr) {
        setError("Invalid email or password. Password must be at least 6 characters.");
        console.error(signupErr);
      }
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
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to manage blog & news content</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#172033] text-white rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <a href="/blog" className="text-sm text-blue-500 hover:underline">Back to Public Site</a>
        </div>
      </motion.div>
    </div>
  );
}
