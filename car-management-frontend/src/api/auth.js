import axios from "./axiosConfig";

export const login = async (credentials) => axios.post("/auth/login", credentials);
export const signup = async (userData) => axios.post("/auth/signup", userData);
