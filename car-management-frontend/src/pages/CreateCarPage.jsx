import React, { useState } from "react";
import { createCar } from "../api/car";
import { useNavigate } from "react-router-dom";

const CreateCarPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCar({ title, description });
      navigate("/cars");
    } catch (error) {
      console.error("Failed to create car:", error);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CreateCarPage;
