import api from "./api";

export interface Budget {
  id: string;
  amount: number;
  [key: string]: any;
}

export const getBudget = async (): Promise<Budget | null> =>
  (await api.get<{ budget: Budget }>("/api/budget")).data.budget;

export const createOrUpdateBudget = async (amount: number): Promise<Budget> =>
  (await api.post<{ budget: Budget }>("/api/budget", { amount })).data.budget;

export const deleteBudget = async (): Promise<{ success: boolean; message?: string }> =>
  (await api.delete<{ success: boolean; message?: string }>("/api/budget")).data;