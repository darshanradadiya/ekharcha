import { Budget } from "../types/types";
import api from "./api";

// Get all budgets
export const getBudgets = async (): Promise<Budget[]> => {
  const res = await api.get<{ budgets: Budget[] }>("/api/budget");
  return res.data.budgets;
};
// Get budget by ID
export const getBudgetById = async (id: string): Promise<Budget> => {
  const res = await api.get<{ budget: Budget }>(`/api/budget/${id}`);
  return res.data.budget;
};

// Search budgets by category
export const searchBudgetsByCategory = async (category: string): Promise<Budget[]> => {
  const res = await api.get<{ budgets: Budget[] }>(`/api/budget/search/category`, {
    params: { category },
  });
  return res.data.budgets;
};

// Create new budget
export const createBudget = async (data: {
  category: string;
  budgeted: number;
}): Promise<Budget> => {
  const res = await api.post<{ budget: Budget }>("/api/budget", data);
  return res.data.budget;
};

// Add spent to budget
export const addSpentToBudget = async (category: string, amount: number): Promise<Budget> => {
  const res = await api.post<{ budget: Budget }>(
    "/api/budget/add-spent",
    { category, amount }
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
  const res = await api.put<{ budget: Budget }>(`/api/budget/${id}`, updates);
  return res.data.budget;
};

// Delete budget
export const deleteBudget = async (id: string): Promise<{ success: boolean; message?: string }> => {
  const res = await api.delete<{ success: boolean; message?: string }>(`/api/budget/${id}`);
  return res.data;
};