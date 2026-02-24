import { House, Telescope, Repeat2, UserRound, LogOut, BookPlus, Building2, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { isLoggedIn } = useAuth();
  const linkBase =
    "w-full flex flex-col items-center justify-center gap-1 py-3 rounded-xl transition-colors duration-150 text-[11px] tracking-[0.18em] uppercase";
  const activeStyle =
    "bg-amber-200/80 text-stone-900 shadow-inner border border-amber-500/70";
  const hoverStyle =
    "hover:bg-amber-100 hover:text-stone-900 text-stone-700";

  return (
    <aside className="w-24 flex-shrink-0 bg-amber-50/80 border-r border-amber-200/80 flex flex-col h-full rounded-l-2xl overflow-hidden">

      <div className="flex-shrink-0 pt-4 pb-2 flex justify-center">
        <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shadow-sm">
          <span className="vintage-font text-xl font-semibold text-stone-800">
            B
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col w-full py-2">
        <nav className="flex flex-col gap-2 w-full px-3">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
            <House size={26} />
            <span className="text-[11px] font-semibold">Home</span>
          </NavLink>

          <NavLink to="/explore" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
            <Telescope size={26} />
            <span className="text-[11px] font-semibold">Explore</span>
          </NavLink>

          <NavLink to="/universities" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
            <Building2 size={26} />
            <span className="text-[11px] font-semibold">Universities</span>
          </NavLink>

          {isLoggedIn && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
                <LayoutDashboard size={26} />
                <span className="text-[11px] font-semibold">Dashboard</span>
              </NavLink>
              <NavLink to="/add-book" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
                <BookPlus size={26} />
                <span className="text-[11px] font-semibold">Add Book</span>
              </NavLink>
              <NavLink to="/exchange" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
                <Repeat2 size={26} />
                <span className="text-[11px] font-semibold">Exchange</span>
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
                <UserRound size={26} />
                <span className="text-[11px] font-semibold">Profile</span>
              </NavLink>
            </>
          )}
        </nav>

        <div className="mt-auto pt-4 pb-6 w-full px-3 flex-shrink-0">
          {isLoggedIn ? (
            <NavLink to="/logout" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
              <LogOut size={24} />
              <span className="text-[11px] font-semibold">Logout</span>
            </NavLink>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `${linkBase} ${isActive ? activeStyle : hoverStyle}`}>
              <UserRound size={24} />
              <span className="text-[11px] font-semibold">Login</span>
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
