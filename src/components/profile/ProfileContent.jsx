import PostCard from "../social/PostCard";
import BookGrid from "../books/BookGrid";

const ProfileContent = ({ activeTab }) => {
  const books = [
    {
      title: "Atomic Habits",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      exchange: true,
      owner: "Sumit",
    },
    {
      title: "Ikigai",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      exchange: false,
      owner: "Sumit",
    },
  ];

  if (activeTab === "Posts") {
    return (
      <div className="p-6 flex flex-col items-center gap-6">
        <PostCard />
        <PostCard />
      </div>
    );
  }

  if (activeTab === "Books") {
    return (
      <div className="p-6">
        <BookGrid books={books} />
      </div>
    );
  }

  if (activeTab === "Exchanges") {
    return (
      <div className="p-6 text-sm text-black/70">
        No completed exchanges yet.
      </div>
    );
  }

  return null;
};

export default ProfileContent;
