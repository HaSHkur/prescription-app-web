import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
  return res.data;
};

export const registerUser = async (username, password, role) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, { username, password, role });
  return res.data;
};

// Prescriptions
export const addPrescription = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/prescriptions`, data);
  return res.data;
};

export const updatePrescription = (id, data) =>
  axiosInstance.put(`/prescriptions/${id}`, data).then((res) => res.data);

export const getPrescriptions = async () => {
  const res = await axios.get(`${API_BASE_URL}/prescriptions`);
  return res.data;
};

export const getPrescriptionById = (id) =>
  axiosInstance.get(`/prescriptions/${id}`).then((res) => res.data);

// Medicines
export const getMedicines = async () => {
  const res = await axios.get(`${API_BASE_URL}/medicines`);
  return res.data;
};

// Dashboard
export const getPrescriptionCounts = async () => {
  const res = await axios.get(`${API_BASE_URL}/prescriptions/count`);
  return res.data;
};
