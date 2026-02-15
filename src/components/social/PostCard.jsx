import { Heart, MessageCircle, Bookmark } from "lucide-react";

const PostCard = () => {
  return (
    <div className="shrink-0 w-full max-w-xl border-2 border-black bg-[#FFF7E6] rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl border-2 border-black bg-[#FFD9A0] flex items-center justify-center font-bold text-black">
          S
        </div>

        <div className="flex-1">
          <p className="font-bold text-sm text-black">Sumit</p>
          <p className="text-xs text-black/60">2 hours ago</p>
        </div>

        <div className="flex gap-3">
          <button className="px-3 py-1 text-sm font-semibold text-black border-2 border-black rounded-xl bg-white hover:bg-orange-100 transition">
            Follow
          </button>

          <button className="px-2 text-xl font-bold text-black/70 hover:text-black transition">
            ⋯
          </button>
        </div>
      </div>

      {/* Body: image + actions right */}
      <div className="mt-4 flex gap-3">
        {/* Image container */}
        <div className="relative flex-1 border-2 border-black rounded-2xl overflow-hidden bg-[#F3DFC8] h-[580px]">
          
          {/* Softer Exchange Tag */}
          <span className="absolute top-3 left-3 px-3 py-1 text-[11px] font-semibold rounded-full bg-[#FFF7E6]/70 text-black/80 shadow-sm border border-black/20">
            Exchange Available
          </span>

          <img
            src="https://i.pinimg.com/736x/4e/54/46/4e5446a6578050139f003f20d860f06a.jpg"
            alt="Dummy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Actions */}
        <div className="w-14 flex flex-col items-center justify-center gap-8">
          <button className="w-12 h-12 rounded-2xl bg-[#FFF7E6] hover:bg-red-100 transition flex flex-col items-center justify-center">
            <Heart size={50} className="text-black" />
            <span className="text-[10px] font-bold mt-1 text-black">24</span>
          </button>

          <button className="w-12 h-12 rounded-2xl bg-[#FFF7E6] hover:bg-orange-100 transition flex flex-col items-center justify-center">
            <MessageCircle size={50} className="text-black" />
            <span className="text-[10px] font-bold mt-1 text-black">6</span>
          </button>

          <button className="w-12 h-12 rounded-2xl bg-[#FFF7E6] hover:bg-orange-100 transition flex flex-col items-center justify-center">
            <Bookmark size={50} className="text-black" />
            <span className="text-[10px] font-bold mt-1 text-black">6</span>
          </button>
        </div>
      </div>

      {/* Caption Bottom */}
      <p className="mt-4 text-sm leading-relaxed text-[#3A2E2A]">
        Just finished reading{" "}
        <span className="font-semibold text-black">Atomic Habits</span>. Really
        loved it 📚✨
      </p>
    </div>
  );
};

export default PostCard;
