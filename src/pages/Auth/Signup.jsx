import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    api.get("/api/universities").then(({ universities: u }) => setUniversities(u || [])).catch(() => setUniversities([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password || !university.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { token, user } = await api.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        university: university.trim(),
      });
      login(token, user);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-alt flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl card-gradient p-8">
        <div className="text-center mb-8">
          <p className="chapter-title mb-2">New Reader</p>
          <h1 className="vintage-font text-3xl font-semibold text-stone-900 tracking-wide">
            Create Account
          </h1>
          <p className="text-sm text-stone-700/90 mt-3 italic">
            Create an account to add your name to the ledger.
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
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-300 rounded-xl bg-[#fdf7ea] focus:border-amber-700 focus:ring-1 focus:ring-amber-600/70 outline-none transition shadow-sm"
              placeholder="Your name"
            />
          </div>
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
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-1">
              University
            </label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-300 rounded-xl bg-[#fdf7ea] focus:border-amber-700 focus:ring-1 focus:ring-amber-600/70 outline-none transition shadow-sm"
              required
            >
              <option value="">Select your university</option>
              {universities.map((u) => (
                <option key={u._id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
            {universities.length === 0 && (
              <p className="text-xs text-amber-700 mt-1">
                Loading universities... Add some via admin if empty.
              </p>
            )}
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
              placeholder="Min 6 characters"
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <div className="ink-divider" />
        <p className="mt-4 text-center text-sm text-stone-700/90">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-amber-800 hover:text-amber-700 underline underline-offset-4 decoration-amber-500/70"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
