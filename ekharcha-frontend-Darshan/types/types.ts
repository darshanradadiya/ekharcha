// Type definitions for the Finance Tracker app

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface Budget {
  _id: string;
  category: string;
  budgeted: number;
  spent: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}


export interface Account {
  _id: number;
  id: number;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution: string;
  accountNumber: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}