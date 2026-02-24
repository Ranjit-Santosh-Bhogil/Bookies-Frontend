import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    api.get("/api/trending?limit=5").then(({ books: b }) => setBooks(b || [])).catch(() => setBooks([]));
  }, []);

  return (
    <div className="rounded-2xl p-4 card-gradient">
      <h3 className="chapter-title mb-1">Trending Volumes</h3>
      <div className="ink-divider" />
      <ul className="flex flex-col divide-y divide-amber-100/70">
        {books.length === 0 ? (
          <li className="py-3 text-sm text-stone-600/80 italic">
            No volumes on record yet
          </li>
        ) : (
          books.map((book) => (
            <li key={book._id} className="py-3 first:pt-0">
              <Link
                to={`/book/${book._id}`}
                className="text-sm font-semibold text-stone-900 hover:text-amber-800 transition-colors line-clamp-2"
              >
                {book.title}
              </Link>
              <p className="text-xs text-stone-600/90">{book.author}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const RightPanel = () => {
  return (
    <aside className="w-[320px] flex-shrink-0 bg-amber-50/70 border-l border-amber-200/80 rounded-r-2xl">
      <div className="p-5 space-y-5 h-full overflow-y-auto">
        <TrendingBooks />
      </div>
    </aside>
  );
};

export default RightPanel;
