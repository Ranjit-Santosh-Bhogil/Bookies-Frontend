import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const TopNav = () => {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const linkBase = "nav-link";
  const activeClass = "nav-link nav-link-active";

  const renderLinks = (onClick) => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : linkBase)}
        onClick={onClick}
      >
        Home
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) => (isActive ? activeClass : linkBase)}
        onClick={onClick}
      >
        Explore
      </NavLink>
      <NavLink
        to="/universities"
        className={({ isActive }) => (isActive ? activeClass : linkBase)}
        onClick={onClick}
      >
        Universities
      </NavLink>
      <NavLink
        to="/exchange"
        className={({ isActive }) => (isActive ? activeClass : linkBase)}
        onClick={onClick}
      >
        Requests
      </NavLink>
    </>
  );

  return (
    <header className="top-nav">
      <div className="max-w-[1300px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo + tagline left */}
        <div className="flex items-baseline flex-shrink-0 gap-3">
          <Link
            to="/"
            className="vintage-font text-xl font-semibold tracking-[0.18em] uppercase text-[#4B2E1E]"
          >
            BOOKIES
          </Link>
          <span className="vintage-font text-[0.7rem] tracking-[0.18em] uppercase text-[#4B2E1E]/80">
            Read • Share • Exchange
          </span>
        </div>

        {/* Center links - desktop */}
        <nav className="hidden md:flex items-center justify-center gap-10 flex-1">
          {renderLinks()}
        </nav>

        {/* Right profile / login - desktop */}
        <div className="hidden md:flex items-center justify-end gap-3 flex-shrink-0">
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full border border-[#4B2E1E]/50 bg-[#F5E6C8] px-3 py-1 text-xs font-medium tracking-[0.16em] uppercase text-[#4B2E1E]"
              >
                <UserRound size={16} className="mr-2" />
                Profile
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border border-[#4B2E1E]/25 bg-[#F5E6C8] text-[#4B2E1E] text-xs shadow-sm">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-[#f1ddba]"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-books"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-[#f1ddba]"
                  >
                    My Books
                  </Link>
                  <Link
                    to="/logout"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-[#f1ddba]"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-[#4B2E1E]/60 bg-[#F5E6C8] px-4 py-1.5 text-xs font-medium tracking-[0.16em] uppercase text-[#4B2E1E]"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile right side: login/profile + hamburger */}
        <div className="flex md:hidden items-center gap-2 relative">
          {isLoggedIn ? (
            <>
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-full border border-[#4B2E1E]/60 bg-[#F5E6C8] px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-[#4B2E1E]"
              >
                <UserRound size={14} className="mr-1.5" />
                Profile
              </button>
              {profileOpen && (
                <div className="absolute right-10 top-9 w-40 rounded-md border border-[#4B2E1E]/25 bg-[#F5E6C8] text-[#4B2E1E] text-xs shadow-sm">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-[#f1ddba]"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-books"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-[#f1ddba]"
                  >
                    My Books
                  </Link>
                  <Link
                    to="/logout"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-[#f1ddba]"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-[#4B2E1E]/60 bg-[#F5E6C8] px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-[#4B2E1E]"
            >
              Login
            </Link>
          )}
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-[#4B2E1E]/60 bg-[#F5E6C8] p-1.5 text-[#4B2E1E]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#4B2E1E]/25 bg-[#F5E6C8]">
          <nav className="max-w-6xl lg:max-w-[80rem] mx-auto px-4 py-3 flex flex-col gap-1">
            {renderLinks(() => setOpen(false))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNav;

