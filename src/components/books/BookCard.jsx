import { apiUrl } from "../../api/client";

const BookCard = ({ book, apiBase }) => {
  const base = apiBase != null ? String(apiBase).replace(/\/$/, "") : apiUrl("").replace(/\/$/, "");
  const imageSrc = book.image ? (book.image.startsWith("http") ? book.image : `${base}${book.image.startsWith("/") ? book.image : "/" + book.image}`) : null;

  const statusClass = book.status === "available" ? "badge-available" : book.status === "requested" ? "badge-requested" : "badge-exchanged";

  return (
    <div className="group book-card">
      <div className="book-card-image">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-medium text-[#4B2E1E]/75">
            No image
          </div>
        )}
        <span className={`absolute top-2 left-2 px-2.5 py-1 text-[10px] font-semibold rounded-full ${statusClass}`}>
          {book.status}
        </span>
        {book.owner && (
          <div className="book-card-owner">
            {(typeof book.owner === "object" ? book.owner.name : "?")[0]}
          </div>
        )}
      </div>
      <div className="book-card-body">
        <p className="book-card-title line-clamp-2">{book.title}</p>
        <p className="book-card-author mt-0.5">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
