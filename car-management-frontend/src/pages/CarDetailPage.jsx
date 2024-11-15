import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCarById, deleteCar } from "../api/car";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      navigate("/cars");
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <button onClick={handleDelete}>Delete Car</button>
      <Link to={`/cars/${id}/edit`}>Edit Car</Link>
    </div>
  );
};

export default CarDetailPage;
