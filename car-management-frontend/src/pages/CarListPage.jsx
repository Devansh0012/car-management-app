import React, { useEffect, useState } from "react";
import { getCars } from "../api/car";
import { Link } from "react-router-dom";

const CarListPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>My Cars</h1>
      <Link to="/cars/create">Add New Car</Link>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <Link to={`/cars/${car._id}`}>{car.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarListPage;
