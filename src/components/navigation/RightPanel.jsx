import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/client";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    api.get("/api/trending?limit=5").then(({ books: b }) => setBooks(b || [])).catch(() => setBooks([]));
  }, []);

  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-white to-indigo-50/80 border border-indigo-200/60 shadow-lg shadow-indigo-500/5">
      <h3 className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-3">
        Trending Books
      </h3>
      <ul className="flex flex-col divide-y divide-indigo-100">
        {books.length === 0 ? (
          <li className="py-3 text-sm text-indigo-600/60">No books yet</li>
        ) : (
          books.map((book) => (
            <li key={book._id} className="py-3 first:pt-0">
              <Link to={`/book/${book._id}`} className="text-sm font-semibold text-indigo-900 hover:text-pink-600 transition line-clamp-2">
                {book.title}
              </Link>
              <p className="text-xs text-indigo-600/70">{book.author}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const RightPanel = () => {
  return (
    <aside className="w-[320px] flex-shrink-0 bg-gradient-to-b from-pink-50/80 to-amber-50/80 border-l border-indigo-200/60 rounded-r-2xl">
      <div className="p-5 space-y-5 h-full overflow-y-auto">
        <TrendingBooks />
      </div>
    </aside>
  );
};

export default RightPanel;
