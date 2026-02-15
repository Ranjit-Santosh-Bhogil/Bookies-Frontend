import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api, { apiUrl } from "../../api/client";
import BookCard from "../../components/books/BookCard";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("mixed");

  useEffect(() => {
    api.get(`/api/trending?type=${tab}&limit=12`).then(({ books }) => setTrending(books || [])).catch(() => setTrending([])).finally(() => setLoading(false));
  }, [tab]);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-indigo-200/80 bg-white/60 backdrop-blur">
          <h1 className="vintage-font text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500 bg-clip-text text-transparent tracking-tight">
            Bookies
          </h1>
          <p className="mt-2 text-sm text-indigo-700/80 font-medium">
            Read • Share • Exchange
          </p>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {["mixed", "recent", "views", "requests"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${tab === t ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-white/80 text-indigo-700 border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/80"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-bold text-indigo-900 mb-4">Trending Books</h2>
          {loading ? (
            <p className="text-indigo-600/70">Loading...</p>
          ) : trending.length === 0 ? (
            <p className="text-indigo-600/70">No books yet. Be the first to add one!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {trending.map((book) => (
                <Link key={book._id} to={`/book/${book._id}`}>
                  <BookCard book={book} apiBase={apiUrl("")} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
