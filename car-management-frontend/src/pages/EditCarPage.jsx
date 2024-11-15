import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, updateCar } from "../api/car";

const EditCarPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const car = await getCarById(id);
        setTitle(car.title);
        setDescription(car.description);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCar(id, { title, description });
      navigate(`/cars/${id}`);
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Car</button>
    </form>
  );
};

export default EditCarPage;
