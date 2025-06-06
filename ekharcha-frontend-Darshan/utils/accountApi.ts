// utils/accountApi.ts
import api from "./api";

export interface Account {
  _id: string;
  name: string;
  type: string;
  balance: number;
  institution: string;
  accountNumber: string;
  relatedAccountId?: string; // Assuming this is a reference to another account or user
  accountId?: string; // Optional, for linking to a user or another entity
  [key: string]: any;
}

export const getAccounts = async (): Promise<Account[]> =>
  (await api.get<{ accounts: Account[] }>("/api/accounts/get")).data.accounts;

export const createAccount = async (account: Partial<Account>): Promise<Account> =>
  (await api.post<{ account: Account }>("/api/accounts/create", account)).data.account;

export const updateAccount = async (
  id: string,
  account: Partial<Account>
): Promise<Account> =>
  (await api.put<{ account: Account }>(`/api/accounts/${id}`, account)).data.account;

export const deleteAccount = async (id: string): Promise<{ success: boolean; message?: string }> =>
  (await api.delete<{ success: boolean; message?: string }>(`/api/accounts/${id}`)).data;