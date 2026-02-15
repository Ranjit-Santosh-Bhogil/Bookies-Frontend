import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";

const CONDITION_OPTIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like new" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "acceptable", label: "Acceptable" },
];

const AddBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [condition, setCondition] = useState("good");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !author.trim() || !subject.trim()) {
      setError("Title, author and subject are required.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("author", author.trim());
    formData.append("subject", subject.trim());
    formData.append("condition", condition);
    formData.append("description", description.trim());
    if (image) formData.append("image", image);
    try {
      await api.post("/api/books", formData);
      navigate("/my-books");
    } catch (err) {
      setError(err.message || "Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-6">Add a book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
              placeholder="Book title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
              placeholder="Author name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
              placeholder="e.g. Computer Science"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
            >
              {CONDITION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none min-h-[100px]"
              placeholder="Optional notes about the book"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Cover image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-500 file:text-white file:font-medium"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl btn-primary font-semibold disabled:opacity-60 disabled:transform-none"
            >
              {loading ? "Adding..." : "Add book"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddBook;
