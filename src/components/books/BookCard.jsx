import { apiUrl } from "../../api/client";

const BookCard = ({ book, apiBase }) => {
  const base = apiBase != null ? String(apiBase).replace(/\/$/, "") : apiUrl("").replace(/\/$/, "");
  const imageSrc = book.image ? (book.image.startsWith("http") ? book.image : `${base}${book.image.startsWith("/") ? book.image : "/" + book.image}`) : null;

  const statusClass = book.status === "available" ? "badge-available" : book.status === "requested" ? "badge-requested" : "badge-exchanged";

  return (
    <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 border border-indigo-200/60 bg-white shadow-md">
      <div className="relative h-52 bg-gradient-to-br from-indigo-100 to-pink-100 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-indigo-400/80 text-sm font-medium">
            No image
          </div>
        )}
        <span className={`absolute top-2 left-2 px-2.5 py-1 text-[10px] font-semibold rounded-full ${statusClass}`}>
          {book.status}
        </span>
        {book.owner && (
          <div className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-amber-400 flex items-center justify-center text-xs font-bold text-white shadow">
            {(typeof book.owner === "object" ? book.owner.name : "?")[0]}
          </div>
        )}
      </div>
      <div className="p-3 bg-white">
        <p className="text-sm font-semibold text-indigo-900 line-clamp-2">{book.title}</p>
        <p className="text-xs text-indigo-600/80 mt-0.5">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
