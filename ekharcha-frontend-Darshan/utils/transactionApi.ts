import { Transaction } from "../types/types";
import api from "./api";

// Get all transactions for the logged-in user
export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get("/api/transactions");
  return res.data;
};

// Add a new transaction
export const createTransaction = async (data: {
  _id ?: string; // Optional ID for editing existing transactions
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  accountId ?: string;
  // category?: string;
  [key: string]: any; // For additional fields if needed
}): Promise<Transaction> => {
  const res = await api.post("/api/transactions", data);
  return res.data.transaction;
};

// Edit a transaction
export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>
): Promise<Transaction> => {
  const res = await api.put(`/api/transactions/${id}`, data);
  return res.data.transaction;
};

// Delete a transaction
export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/api/transactions/${id}`);
};