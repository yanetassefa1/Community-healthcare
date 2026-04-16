import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl text-teal-700">
          <Heart size={22} className="text-teal-500" fill="currentColor" />
          CommunityHealth
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/resources" className="hover:text-teal-700 transition-colors">
            Find Resources
          </Link>
          {isAuthenticated && (
            <Link to="/appointments" className="hover:text-teal-700 transition-colors">
              My Appointments
            </Link>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="hover:text-teal-700 transition-colors">
                {user?.first_name || user?.email}
              </Link>
              <button onClick={handleLogout} className="btn-secondary text-sm py-1.5">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-secondary text-sm py-1.5">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm py-1.5">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden text-slate-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-3 text-sm font-medium text-slate-700 border-t border-slate-100 pt-3">
          <Link to="/resources" onClick={() => setMenuOpen(false)}>Find Resources</Link>
          {isAuthenticated && (
            <Link to="/appointments" onClick={() => setMenuOpen(false)}>My Appointments</Link>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
