import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice.js";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex items-center p-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900 font-[Roboto]">
            Flowtext
          </span>
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4 ml-auto">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 font-[Manrope]"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 ml-auto">
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 font-medium font-[Manrope]"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200 font-[Manrope]"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;