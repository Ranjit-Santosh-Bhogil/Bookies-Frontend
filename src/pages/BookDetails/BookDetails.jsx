import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api, { apiUrl } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import { MessageCircle, User } from "lucide-react";

const CONDITION_LABELS = { new: "New", like_new: "Like new", good: "Good", fair: "Fair", acceptable: "Acceptable" };

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    api.get(`/api/books/${bookId}`).then(({ book: b }) => setBook(b)).catch(() => setBook(null)).finally(() => setLoading(false));
  }, [bookId]);

  useEffect(() => {
    if (!bookId) return;
    api.get(`/api/comments/book/${bookId}`).then(({ comments: c }) => setComments(c || [])).catch(() => setComments([]));
  }, [bookId]);

  const refreshBook = () => {
    api.get(`/api/books/${bookId}`).then(({ book: b }) => setBook(b)).catch(() => {});
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !isLoggedIn) return;
    setActionLoading(true);
    try {
      const { comment } = await api.post(`/api/comments/book/${bookId}`, { body: commentText.trim() });
      setComments((c) => [...c, comment]);
      setCommentText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestExchange = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setActionLoading(true);
    setError("");
    try {
      await api.post(`/api/exchange/request/${bookId}`, { message: requestMessage.trim() });
      setRequestMessage("");
      refreshBook();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-indigo-600">Loading...</div>
      </DashboardLayout>
    );
  }
  if (!book) {
    return (
      <DashboardLayout>
        <div className="p-6 text-indigo-600">Book not found.</div>
      </DashboardLayout>
    );
  }

  const imageUrl = book.image ? apiUrl(book.image) : null;
  const isOwner = isLoggedIn && user?._id === book.owner?._id;
  const canRequest = isLoggedIn && !isOwner && book.status === "available";

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl overflow-hidden border border-indigo-200/80 bg-white shadow-lg">
            {imageUrl ? (
              <img src={imageUrl} alt={book.title} className="w-full aspect-[3/4] object-cover" />
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center text-indigo-400/80">No image</div>
            )}
            <div className="p-3 flex items-center justify-between bg-white">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${book.status === "available" ? "badge-available" : book.status === "requested" ? "badge-requested" : "badge-exchanged"}`}>
                {book.status}
              </span>
              <span className="text-xs text-indigo-600/70">{book.viewCount} views · {book.requestCount} requests</span>
            </div>
          </div>
          <div>
            <h1 className="vintage-font text-2xl font-bold text-indigo-900">{book.title}</h1>
            <p className="text-indigo-700/90 mt-1">by {book.author}</p>
            <p className="text-sm text-indigo-600/80 mt-2">Subject: {book.subject} · {book.university}</p>
            <p className="text-sm mt-2 text-indigo-800">Condition: {CONDITION_LABELS[book.condition] || book.condition}</p>
            {book.description && <p className="mt-3 text-indigo-800/90">{book.description}</p>}
            <div className="mt-4 p-3 rounded-xl bg-indigo-50/80 border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-600">Owner</p>
              <Link to={`/owner/${book.owner._id}`} className="flex items-center gap-2 mt-1 text-indigo-800 hover:text-pink-600 transition">
                <User size={18} />
                <span className="font-medium">{book.owner?.name}</span>
                <span className="text-sm text-indigo-600/80">({book.owner?.university})</span>
              </Link>
            </div>
            {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
            {canRequest && (
              <form onSubmit={handleRequestExchange} className="mt-4">
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Message to owner (optional)"
                  className="w-full px-3 py-2 border-2 border-indigo-200 rounded-xl mb-2 min-h-[80px] focus:border-indigo-500 outline-none"
                />
                <button type="submit" disabled={actionLoading} className="px-4 py-2 rounded-xl btn-primary disabled:opacity-60 disabled:transform-none">
                  {actionLoading ? "Sending..." : "Request exchange"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-indigo-200/80 pt-6">
          <h2 className="font-bold text-indigo-900 flex items-center gap-2">
            <MessageCircle size={20} className="text-pink-500" /> Comments ({comments.length})
          </h2>
          {isLoggedIn && (
            <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 outline-none"
              />
              <button type="submit" disabled={actionLoading || !commentText.trim()} className="px-4 py-2 rounded-xl btn-primary disabled:opacity-60 disabled:transform-none">
                Post
              </button>
            </form>
          )}
          <ul className="mt-4 space-y-3">
            {comments.map((c) => (
              <li key={c._id} className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <p className="text-sm font-medium text-indigo-900">{c.userId?.name}</p>
                <p className="text-indigo-800/90">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookDetails;
