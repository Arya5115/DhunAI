import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Wellness Chat", path: "/chat" },
  { label: "Programs Library", path: "/library" },
  { label: "Chakra Journey", path: "/chakra" },
  { label: "Daily Schedule", path: "/schedule" },
  { label: "Diagnostic", path: "/diagnostic" },
  { label: "Profile", path: "/profile" },
  { label: "Analytics", path: "/analytics" }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 px-6 flex flex-wrap gap-3 justify-between items-center text-sm uppercase tracking-widest transition-all duration-300 ${
        scrolled ? "py-2 bg-ivory/80 backdrop-blur-md shadow-sm" : "py-4 bg-transparent"
      }`}
    >
      <NavLink to="/" className="font-heading text-2xl text-sage tracking-normal normal-case">
        Tarang Cure
      </NavLink>
      <div className="flex flex-wrap gap-4 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative pb-1 transition-colors ${
                isActive ? "text-saffron" : "text-ink/70 hover:text-ink"
              } after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:bg-saffron after:transition-all after:duration-300 ${
                isActive ? "after:w-full" : "after:w-0"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
        {user && (user.role === "admin" || user.role === "staff") && (
          <NavLink to="/admin" className="text-ink/70 hover:text-ink">
            Admin
          </NavLink>
        )}
        {user ? (
          <button onClick={logout} className="btn-outline">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="text-ink/70 hover:text-ink">
              Login
            </NavLink>
            <NavLink to="/register" className="text-ink/70 hover:text-ink">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
