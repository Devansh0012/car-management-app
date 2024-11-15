import axios from "./axiosConfig";

export const getCars = async () => axios.get("/cars");
export const getCarById = async (id) => axios.get(`/cars/${id}`);
export const createCar = async (carData) => axios.post("/cars", carData, {
  headers: { "Content-Type": "multipart/form-data" },
});
export const updateCar = async (id, carData) => axios.put(`/cars/${id}`, carData);
export const deleteCar = async (id) => axios.delete(`/cars/${id}`);
