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
      <div className="w-full max-w-md rounded-2xl card-gradient border border-indigo-200/80 shadow-2xl shadow-indigo-500/10 p-8">
        <div className="text-center mb-8">
          <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            Bookies
          </h1>
          <p className="text-sm text-indigo-600/80 mt-1">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              placeholder="you@university.edu"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl btn-primary disabled:opacity-60 disabled:transform-none"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-indigo-600/80">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-pink-600 hover:text-pink-500 transition">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
