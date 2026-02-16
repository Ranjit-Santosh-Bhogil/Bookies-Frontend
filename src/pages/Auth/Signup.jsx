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
      <div className="w-full max-w-md rounded-2xl card-gradient border border-indigo-200/80 shadow-2xl shadow-indigo-500/10 p-8">
        <div className="text-center mb-8">
          <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            Bookies
          </h1>
          <p className="text-sm text-indigo-600/80 mt-1">Create an account (registered universities only)</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              placeholder="you@university.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">University</label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
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
              <p className="text-xs text-amber-700 mt-1">Loading universities... Add some via admin if empty.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
              placeholder="Min 6 characters"
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl btn-primary disabled:opacity-60 "
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-indigo-600/80">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-pink-600 hover:text-pink-500 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
