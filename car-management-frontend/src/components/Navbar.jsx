import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/cars" className="text-xl font-bold">Car Manager</Link>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
