const ExchangeCard = ({ data }) => {
  return (
    <div className="border-2 border-black bg-[#FFF7E6] rounded-2xl p-4 flex gap-4 items-center">
      
      {/* Book cover */}
      <div className="w-20 h-28 bg-[#F3DFC8] border-2 border-black rounded-xl overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-black">{data.title}</p>
        <p className="text-xs text-black/60">
          {data.userText}
        </p>
      </div>

      {/* Actions */}
      {data.type === "Incoming" && (
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-semibold border-2 border-black rounded-lg bg-[#FFD9A0] hover:bg-[#FFC47A]">
            Accept
          </button>
          <button className="px-3 py-1 text-xs font-semibold border-2 border-black rounded-lg bg-white hover:bg-red-100">
            Decline
          </button>
        </div>
      )}

      {data.type === "Outgoing" && (
        <span className="text-xs font-semibold px-3 py-1 border-2 border-black rounded-lg bg-[#FFF3D6]">
          Pending
        </span>
      )}

      {data.type === "Completed" && (
        <span className="text-xs font-semibold px-3 py-1 border-2 border-black rounded-lg bg-[#DFF5E1]">
          Completed
        </span>
      )}
    </div>
  );
};

export default ExchangeCard;
