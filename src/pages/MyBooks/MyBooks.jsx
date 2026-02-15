import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Pencil, Trash2 } from "lucide-react";

const MyBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/books/my-books").then(({ books: b }) => setBooks(b || [])).catch(() => setBooks([])).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (bookId) => {
    if (!confirm("Delete this book listing?")) return;
    try {
      await api.delete(`/api/books/${bookId}`);
      setBooks((b) => b.filter((x) => x._id !== bookId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">My books</h1>
          <Link to="/add-book" className="px-4 py-2 rounded-xl btn-primary font-semibold">
            Add book
          </Link>
        </div>
        {loading ? (
          <p className="text-indigo-600/70">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-indigo-600/70">You haven&apos;t listed any books yet. <Link to="/add-book" className="text-pink-600 font-semibold hover:underline">Add one</Link>.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div key={book._id} className="rounded-xl overflow-hidden border border-indigo-200/80 bg-white shadow-md hover:shadow-lg transition">
                <Link to={`/book/${book._id}`} className="block">
                  <div className="aspect-[3/4] bg-gradient-to-br from-indigo-100 to-pink-100">
                    {book.image ? (
                      <img src={apiUrl(book.image)} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400/80">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-indigo-900">{book.title}</p>
                    <p className="text-sm text-indigo-600/80">{book.author} · {book.subject}</p>
                    <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${book.status === "available" ? "badge-available" : book.status === "requested" ? "badge-requested" : "badge-exchanged"}`}>
                      {book.status}
                    </span>
                  </div>
                </Link>
                <div className="p-3 border-t border-indigo-100 flex gap-2">
                  <button
                    onClick={() => navigate(`/book/${book._id}/edit`)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 text-indigo-700 text-sm font-medium transition"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl border-2 border-rose-200 hover:bg-rose-50 text-rose-600 text-sm font-medium transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBooks;
