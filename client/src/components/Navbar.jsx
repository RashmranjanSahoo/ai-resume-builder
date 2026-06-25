import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear both Redux and browser storage so protected routes ask for login again.
  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-40 border-b border-white/60 bg-white/80 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 text-slate-800 transition-all dark:text-slate-100">
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden text-slate-600 dark:text-slate-300">
            Hi, {user?.name}
          </p>
          <button
            onClick={logoutUser}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 shadow-sm transition-all active:scale-95 hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
