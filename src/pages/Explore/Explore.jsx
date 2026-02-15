import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";
import BookCard from "../../components/books/BookCard";

const Explore = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("");
  const [status, setStatus] = useState("");
  const [universities, setUniversities] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 12;

  useEffect(() => {
    api.get("/api/universities").then(({ universities: u }) => setUniversities(u || [])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (university) params.set("university", university);
    if (status) params.set("status", status);
    params.set("page", page);
    params.set("limit", limit);
    api.get(`/api/books?${params}`).then(({ books: b, total: t }) => {
      setBooks(b || []);
      setTotal(t || 0);
    }).catch(() => setBooks([])).finally(() => setLoading(false));
  }, [search, university, status, page]);

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="vintage-font text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">Explore books</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by title, author, subject"
            className="px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none min-w-[200px] flex-1"
          />
          <select
            value={university}
            onChange={(e) => { setUniversity(e.target.value); setPage(1); }}
            className="px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
          >
            <option value="">All universities</option>
            {universities.map((u) => (
              <option key={u._id} value={u.name}>{u.name}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 border-2 border-indigo-200 rounded-xl bg-white focus:border-indigo-500 outline-none"
          >
            <option value="">All statuses</option>
            <option value="available">Available</option>
            <option value="requested">Requested</option>
            <option value="exchanged">Exchanged</option>
          </select>
        </div>
        {loading ? (
          <p className="text-indigo-600/70">Loading...</p>
        ) : books.length === 0 ? (
          <p className="text-indigo-600/70">No books match your filters.</p>
        ) : (
          <>
            <p className="text-sm text-indigo-600/80 mb-4">{total} book(s) found</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {books.map((book) => (
                <Link key={book._id} to={`/book/${book._id}`}>
                  <BookCard book={book} apiBase={apiUrl("")} />
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex gap-2 mt-6 justify-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded-xl border-2 border-indigo-200 disabled:opacity-50 hover:bg-indigo-50 transition"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-indigo-800">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-xl border-2 border-indigo-200 disabled:opacity-50 hover:bg-indigo-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Explore;
