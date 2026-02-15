import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import DashboardLayout from "../../layouts/DashboardLayout";
import BookCard from "../../components/books/BookCard";

const OwnerProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/users/owner/${userId}`).then(({ user: u, books: b }) => {
      setUser(u);
      setBooks(b || []);
    }).catch(() => setUser(null)).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <DashboardLayout><div className="p-6 text-indigo-600">Loading...</div></DashboardLayout>;
  if (!user) return <DashboardLayout><div className="p-6 text-indigo-600">User not found.</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="border border-indigo-200/80 rounded-xl p-6 bg-white shadow-md mb-6 bg-gradient-to-br from-indigo-50/80 to-pink-50/80">
          <h1 className="vintage-font text-2xl font-bold text-indigo-900">{user.name}</h1>
          <p className="text-indigo-600/80">{user.university}</p>
          {user.bio && <p className="mt-2 text-indigo-800/90">{user.bio}</p>}
        </div>
        <h2 className="text-xl font-bold text-indigo-900 mb-4">Listed books</h2>
        {books.length === 0 ? (
          <p className="text-indigo-600/70">No books listed.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {books.map((book) => (
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

export default OwnerProfile;
