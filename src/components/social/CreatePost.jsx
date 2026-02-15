import { Image, BookOpen, SendHorizonal } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="border-2 border-black bg-[#FFF7E6] rounded-2xl p-3">
      {/* Top */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#FFD9A0] flex items-center justify-center font-bold">
          S
        </div>

        <div className="flex-1">
          <p className="text-sm font-bold">Create Post</p>
          <p className="text-xs opacity-70">Share books, thoughts & exchange</p>
        </div>
      </div>

      {/* Input */}
      <textarea
        placeholder="What's on your mind today?"
        className="mt-3 w-full min-h-[90px] border-2 border-black rounded-2xl bg-white px-3 py-2 text-sm outline-none resize-none"
      />

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            className="w-10 h-10 border-2 border-black rounded-xl bg-white hover:bg-orange-100 transition flex items-center justify-center"
            title="Add Image"
          >
            <Image size={18} />
          </button>

          <button
            className="w-10 h-10 border-2 border-black rounded-xl bg-white hover:bg-orange-100 transition flex items-center justify-center"
            title="Tag Book"
          >
            <BookOpen size={18} />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl bg-[#FF6A2B] text-white font-semibold hover:opacity-90 transition">
          <SendHorizonal size={18} />
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
