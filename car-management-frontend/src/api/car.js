import axios from "./axiosConfig";

export const getCars = async () => {
  const response = await axios.get("/api/cars");
  return response.data;
};

export const getCarById = async (id) => {
  const response = await axios.get(`/api/cars/${id}`);
  return response.data;
};

export const createCar = async (carData) => {
  const response = await axios.post("/api/cars", carData);
  return response.data;
};

export const updateCar = async (id, carData) => {
  const response = await axios.put(`/api/cars/${id}`, carData);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axios.delete(`/api/cars/${id}`);
  return response.data;
};
