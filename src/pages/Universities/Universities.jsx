import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";
import BookCard from "../../components/books/BookCard";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/universities").then(({ universities: u }) => setUniversities(u || [])).catch(() => setUniversities([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selected) {
      setBooks([]);
      return;
    }
    api.get(`/api/books/university/${encodeURIComponent(selected)}`).then(({ books: b }) => setBooks(b || [])).catch(() => setBooks([]));
  }, [selected]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">Books by university</h1>
        {loading ? (
          <p className="text-indigo-600/70">Loading universities...</p>
        ) : (
          <>
            <select
              value={selected || ""}
              onChange={(e) => setSelected(e.target.value || null)}
              className="mb-6 px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none min-w-[280px]"
            >
              <option value="">Select a university</option>
              {universities.map((u) => (
                <option key={u._id} value={u.name}>{u.name}</option>
              ))}
            </select>
            {selected && (
              <>
                <h2 className="text-xl font-bold text-indigo-900 mb-4">{selected}</h2>
                {books.length === 0 ? (
                  <p className="text-indigo-600/70">No books listed for this university yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {books.map((book) => (
                      <Link key={book._id} to={`/book/${book._id}`}>
                        <BookCard book={book} apiBase={apiUrl("")} />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Universities;
