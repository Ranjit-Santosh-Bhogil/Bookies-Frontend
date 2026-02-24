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
      <div className="pt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {["mixed", "recent", "views", "requests"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
                tab === t
                  ? "bg-[#4B2E1E] text-[#F5E6C8]"
                  : "bg-[#F5E6C8] text-[#4B2E1E] border border-[#4B2E1E]/30 hover:bg-[#f1ddba]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <h2 className="chapter-heading">Trending Books</h2>

        {loading ? (
          <p className="text-sm text-[#4B2E1E]/80">Loading...</p>
        ) : trending.length === 0 ? (
          <p className="text-sm text-[#4B2E1E]/80">
            No books yet. Be the first to add one!
          </p>
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
    </DashboardLayout>
  );
};

export default Home;
