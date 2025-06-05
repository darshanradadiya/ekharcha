import api from "./api";

export const getTransactions = async () =>
  (await api.get("/api/transactions")).data;

export const getTransactionById = async (id: string) =>
  (await api.get(`/api/transactions/${id}`)).data;

export const createTransaction = async (txn: any) =>
  (await api.post("/api/transactions", txn)).data.transaction;

export const updateTransaction = async (id: string, txn: any) =>
  (await api.put(`/api/transactions/${id}`, txn)).data.transaction;

export const deleteTransaction = async (id: string) =>
  (await api.delete(`/api/transactions/${id}`)).data;

export const getTransactionsByType = async (type: string) =>
  (await api.get(`/api/transactions/type/${type}`)).data;

export const getTransactionsByAccount = async (accountId: string) =>
  (await api.get(`/api/transactions/account/${accountId}`)).data;

export const getTransactionsByCategory = async (categoryId: string) =>
  (await api.get(`/api/transactions/category/${categoryId}`)).data;

export const getTransactionSummary = async () =>
  (await api.get("/api/transactions/summary")).data;

export const getMonthlySummary = async () =>
  (await api.get("/api/transactions/monthly")).data;

export const getCategorywiseSummary = async () =>
  (await api.get("/api/transactions/category-summary")).data;