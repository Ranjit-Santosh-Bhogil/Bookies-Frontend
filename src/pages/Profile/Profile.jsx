import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/users/profile").then(({ user: u }) => {
      if (u) {
        updateUser(u);
        setName(u.name || "");
        setBio(u.bio || "");
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const { user: u } = await api.put("/api/users/profile", { name, bio });
      updateUser(u);
      setMessage("Profile updated.");
    } catch (err) {
      setMessage(err.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-2xl">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-6">Profile</h1>
        <div className="border border-indigo-200/80 rounded-xl p-6 bg-white/80 shadow-md mb-6">
          <p className="text-indigo-600/80">{user?.email}</p>
          <p className="text-indigo-800 font-medium mt-1">{user?.university}</p>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          {message && <p className={`text-sm ${message.startsWith("Profile") ? "text-teal-700" : "text-rose-600"}`}>{message}</p>}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none min-h-[80px]"
              placeholder="Short bio (optional)"
            />
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl btn-primary font-semibold disabled:opacity-60 disabled:transform-none">
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/my-books" className="text-indigo-600 font-semibold hover:text-pink-600 transition">My books</Link>
          <Link to="/exchange" className="text-indigo-600 font-semibold hover:text-pink-600 transition">Exchange requests</Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
