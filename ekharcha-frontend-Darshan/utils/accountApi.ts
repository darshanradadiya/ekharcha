// src/api/accountApi.ts
import api from "./api";

export interface Account {
  _id?: string;
  name: string;
  email: string;
  username?: string;
  userId?: string;
  type?: string;
  [key: string]: any;
}

// ✅ GET /api/accounts/get
export const getAccounts = async (): Promise<Account[]> => {
  const { data } = await api.get<Account[]>("/api/accounts/get");
  return data;
};

// ✅ POST /api/accounts/create
export const createAccount = async (account: Partial<Account>): Promise<Account> => {
  const { data } = await api.post<{ message: string; account: Account }>("/api/accounts/create", account);
  return data.account;
};

// ✅ PUT /api/accounts/:id
export const updateAccount = async (id: string, account: Partial<Account>): Promise<Account> => {
  const { data } = await api.put<{ message: string; account: Account }>(`/api/accounts/${id}`, account);
  return data.account;
};

// ✅ DELETE /api/accounts/:id
export const deleteAccount = async (id: string): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`/api/accounts/${id}`);
  return data;
};

// ✅ GET /api/accounts/search?type=...
export const searchAccountsByType = async (type: string): Promise<Account[]> => {
  const { data } = await api.get<Account[]>(`/search?type=${type}`);
  return data;
};
