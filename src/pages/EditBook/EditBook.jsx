import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";

const CONDITION_OPTIONS = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like new" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "acceptable", label: "Acceptable" },
];

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [condition, setCondition] = useState("good");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/api/books/${bookId}`).then(({ book: b }) => {
      setBook(b);
      setTitle(b?.title || "");
      setAuthor(b?.author || "");
      setSubject(b?.subject || "");
      setCondition(b?.condition || "good");
      setDescription(b?.description || "");
    }).catch(() => setBook(null)).finally(() => setLoading(false));
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !author.trim() || !subject.trim()) {
      setError("Title, author and subject are required.");
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("author", author.trim());
    formData.append("subject", subject.trim());
    formData.append("condition", condition);
    formData.append("description", description.trim());
    if (image) formData.append("image", image);
    try {
      await api.put(`/api/books/${bookId}`, formData);
      navigate("/my-books");
    } catch (err) {
      setError(err.message || "Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <DashboardLayout><div className="p-6 text-indigo-600">Loading...</div></DashboardLayout>;
  if (!book) return <DashboardLayout><div className="p-6 text-indigo-600">Book not found.</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="p-6 max-w-xl">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-6">Edit book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Title *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Author *</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Subject *</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none">
              {CONDITION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none min-h-[100px]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-indigo-900 mb-1">New cover image (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="w-full px-4 py-2 border-2 border-black/30 rounded-lg bg-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-500 file:text-white file:font-medium file:rounded-lg" />
            {book.image && !image && <p className="text-xs text-indigo-600/70 mt-1">Current image kept if you don’t choose a new one.</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl btn-primary font-semibold disabled:opacity-60 disabled:transform-none">{saving ? "Saving..." : "Save"}</button>
            <button type="button" onClick={() => navigate("/my-books")} className="px-6 py-2.5 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-700 font-semibold transition">Cancel</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditBook;
