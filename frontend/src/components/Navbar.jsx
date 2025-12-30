import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  UserCircle,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-gradient-to-r from-[#1f2933] to-[#2a3340]
        border-b border-white/10
        shadow-lg
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🔹 Logo */}
        <div
          onClick={() =>
            navigate(user.role === "admin" ? "/admin" : "/profile")
          }
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div
            className="bg-[#debb69] text-black p-2 rounded-lg shadow-md
            group-hover:scale-110 transition"
          >
            <UserCircle size={20} />
          </div>
          <span
            className="font-bold text-white tracking-wide
            group-hover:text-[#E9D7AB] transition"
          >
            UMS
          </span>
        </div>

        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center gap-1 text-gray-300 font-medium
              hover:text-[#E9D7AB] transition"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}

          <Link
            to="/profile"
            className="flex items-center gap-1 text-gray-300 font-medium
            hover:text-[#E9D7AB] transition"
          >
            <UserCircle size={16} />
            Profile
          </Link>

          {/* User Info */}
          <div
            className="flex items-center gap-3 px-3 py-1.5 rounded-lg
            hover:bg-white/10 transition"
          >
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-white">
                {user.fullName}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
                ${
                  user.role === "admin"
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {user.role}
              </span>
            </div>

            {user.role === "admin" ? (
              <ShieldCheck className="text-indigo-300" size={18} />
            ) : (
              <UserCircle className="text-emerald-300" size={18} />
            )}
          </div>

          <button
            onClick={logout}
            className="
              flex items-center gap-1
              bg-red-500/90 text-white px-3 py-1.5 rounded-lg
              hover:bg-red-600 hover:-translate-y-0.5
              transition-all duration-200
              active:scale-95
              text-sm font-medium
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* 🔹 Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#1f2933] border-t border-white/10 px-4 py-5 space-y-4">
          <div>
            <p className="text-white font-semibold">
              {user.fullName}
            </p>
            <span
              className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full capitalize
              ${
                user.role === "admin"
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }`}
            >
              {user.role}
            </span>
          </div>

          {user.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-[#E9D7AB]"
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block text-gray-300 hover:text-[#E9D7AB]"
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="w-full flex justify-center items-center gap-2
            bg-red-500/90 hover:bg-red-600
            py-2 rounded-lg text-white font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

