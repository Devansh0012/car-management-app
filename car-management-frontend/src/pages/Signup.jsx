import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/login");
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-8 bg-white shadow-md rounded" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
