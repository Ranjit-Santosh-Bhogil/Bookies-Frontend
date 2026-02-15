const ExchangeWidget = () => {
  return (
    <div className="border-2 border-black/70 bg-[#FFF8EC] rounded-2xl p-4">
      <h3 className="text-sm font-bold text-black mb-3">
        Active Exchanges
      </h3>

      <div className="flex flex-col divide-y divide-black/20">
        {/* Exchange Item */}
        <div className="py-3 flex justify-between items-center">
          <div>
            <p className="font-semibold text-black">Atomic Habits</p>
            <p className="text-xs text-black/60">
              Requested by Rahul
            </p>
          </div>
          <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-[#FFD9A0]/70 text-black border border-black/20">
            Pending
          </span>
        </div>

        {/* Exchange Item */}
        <div className="py-3 flex justify-between items-center">
          <div>
            <p className="font-semibold text-black">Ikigai</p>
            <p className="text-xs text-black/60">
              Awaiting response
            </p>
          </div>
          <span className="px-2 py-1 text-[10px] font-semibold rounded-full bg-[#FFF3D6]/70 text-black border border-black/20">
            Sent
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeWidget;
