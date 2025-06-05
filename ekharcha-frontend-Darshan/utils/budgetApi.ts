import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Budget } from "../types/types";

const getAuthToken = async () => {
  return await AsyncStorage.getItem("token"); // "token" is the key you used to store the JWT
};
const BASE_URL = "http://192.168.170.220:8000/api/budget";

// Get all budgets
export const getBudgets = async (): Promise<Budget[]> => {
  const token = await getAuthToken();
  const res = await axios.get(`${BASE_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get budget by ID
export const getBudgetById = async (id: string): Promise<Budget> => {
  const token = await getAuthToken();
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Search budgets by category
export const searchBudgetsByCategory = async (category: string): Promise<Budget[]> => {
  const token = await getAuthToken();
  const res = await axios.get(`${BASE_URL}/search/category`, {
    params: { category },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create new budget
export const createBudget = async (data: {
  category: string;
  budgeted: number;
}) => {
  const token = await getAuthToken();
  const res = await axios.post(`${BASE_URL}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // If your backend returns { budget: ... }
  return res.data.budget;
  // If your backend returns just the object, use: return res.data;
};

export const addSpentToBudget = async (category: string, amount: number) => {
  const token = await getAuthToken();
  const res = await axios.post(
    `${BASE_URL}/add-spent`,
    { category, amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.budget;
};
// Update existing budget
export const updateBudget = async (
  id: string,
  updates: {
    category?: string;
    budgeted?: number;
    spent?: number;
  }
): Promise<Budget> => {
  const token = await getAuthToken();
  const res = await axios.put(`${BASE_URL}/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.budget;
};

// Delete budget
export const deleteBudget = async (id: string): Promise<void> => {
  const token = await getAuthToken();
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};