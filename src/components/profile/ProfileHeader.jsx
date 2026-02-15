const ProfileHeader = () => {
  return (
    <div className="border-b-2 border-black p-6 bg-[#F5EAD7]">
      <div className="flex items-center gap-6">
        
        {/* Avatar */}
        <div className="w-20 h-20 rounded-2xl border-2 border-black bg-[#FFD9A0] flex items-center justify-center text-2xl font-bold">
          S
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-xl font-bold">Sumit</h2>
          <p className="text-sm text-black/60">
            Book lover • Self-help & Tech
          </p>

          {/* Stats */}
          <div className="flex gap-6 mt-3 text-sm font-semibold">
            <span>12 Posts</span>
            <span>8 Books</span>
            <span>3 Exchanges</span>
          </div>
        </div>

        {/* Edit button */}
        <button className="px-4 py-2 border-2 border-black rounded-xl bg-white hover:bg-[#FFD9A0]/60 text-sm font-semibold">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
