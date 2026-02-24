import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.post("/api/auth/login", { email: email.trim(), password });
      login(token, user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-alt flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl card-gradient p-8">
        <div className="text-center mb-8">
          <p className="chapter-title mb-2">Volume Access</p>
          <h1 className="vintage-font text-3xl font-semibold text-stone-900 tracking-wide">
            Sign In
          </h1>
          <p className="text-sm text-stone-700/90 mt-3 italic">
            Sign in as you would open a familiar chapter.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-300 rounded-xl bg-[#fdf7ea] focus:border-amber-700 focus:ring-1 focus:ring-amber-600/70 outline-none transition shadow-sm"
              placeholder="you@university.edu"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-300 rounded-xl bg-[#fdf7ea] focus:border-amber-700 focus:ring-1 focus:ring-amber-600/70 outline-none transition shadow-sm"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="ink-divider" />
        <p className="mt-4 text-center text-sm text-stone-700/90">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-amber-800 hover:text-amber-700 underline underline-offset-4 decoration-amber-500/70"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
