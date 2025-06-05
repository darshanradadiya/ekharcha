import { MonthlyData, Transaction } from '@/types/types';

// Mock transactions data
export const mockTransactions: Transaction[] = [
  {
    id: 1,
    description: 'Grocery Shopping',
    amount: 85.43,
    category: 'Food',
    date: '2023-07-15',
    type: 'expense'
  },
  {
    id: 2,
    description: 'Monthly Salary',
    amount: 3250,
    category: 'Salary',
    date: '2023-07-01',
    type: 'income'
  },
  {
    id: 3,
    description: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: '2023-07-10',
    type: 'expense'
  },
  {
    id: 4,
    description: 'Uber Ride',
    amount: 24.50,
    category: 'Transportation',
    date: '2023-07-08',
    type: 'expense'
  },
  {
    id: 5,
    description: 'Freelance Project',
    amount: 450,
    category: 'Investments',
    date: '2023-07-12',
    type: 'income'
  },
  {
    id: 6,
    description: 'Restaurant Dinner',
    amount: 65.80,
    category: 'Food',
    date: '2023-07-14',
    type: 'expense'
  },
  {
    id: 7,
    description: 'Electric Bill',
    amount: 94.62,
    category: 'Utilities',
    date: '2023-07-05',
    type: 'expense'
  },
  {
    id: 8,
    description: 'Online Course',
    amount: 199.99,
    category: 'Education',
    date: '2023-07-03',
    type: 'expense'
  },
  {
    id: 9,
    description: 'Interest Payment',
    amount: 12.33,
    category: 'Investments',
    date: '2023-07-28',
    type: 'income'
  },
  {
    id: 10,
    description: 'New Shoes',
    amount: 89.95,
    category: 'Shopping',
    date: '2023-07-18',
    type: 'expense'
  }
];

// Mock budget data
// export const mockBudgets: Budget[] = [
//   {
//     category: 'Food',
//     budgeted: 500,
//     spent: 320.75,
//     color: '#EF4444',
//     status: 'on-track'
//   },
//   {
//     category: 'Transportation',
//     budgeted: 300,
//     spent: 280.50,
//     color: '#F59E0B',
//     status: 'warning'
//   },
//   {
//     category: 'Entertainment',
//     budgeted: 200,
//     spent: 215.99,
//     color: '#8B5CF6',
//     status: 'over-budget'
//   },
//   {
//     category: 'Utilities',
//     budgeted: 350,
//     spent: 190.45,
//     color: '#3B82F6',
//     status: 'under-budget'
//   },
//   {
//     category: 'Shopping',
//     budgeted: 400,
//     spent: 210.25,
//     color: '#10B981',
//     status: 'on-track'
//   },
//   {
//     category: 'Healthcare',
//     budgeted: 150,
//     spent: 95.50,
//     color: '#EC4899',
//     status: 'under-budget'
//   }
// ];

// Mock accounts data
// export const mockAccounts: Account[] = [
//   // ...existing code...
//   {
//       _id: 1, // or use a number that matches your schema
//       id: 1,
//       name: 'Main Checking',
//       type: 'checking',
//       balance: 5240.83,
//       institution: 'Chase Bank',
//       accountNumber: '1234567890'
//   },
//   // ...existing code...
//   {
//   _id: 2, // or use a number that matches your schema
//     id: 2,
//     name: 'Savings Account',
//     type: 'savings',
//     balance: 10450.25,
//     institution: 'Bank of America',
//     accountNumber: '0987654321'
//   },
//   {
//   _id: 3, // or use a number that matches your schema
//     id: 3,
//     name: 'Visa Credit Card',
//     type: 'credit',
//     balance: -2540.63,
//     institution: 'Citibank',
//     accountNumber: '5555666677778888'
//   },
//   {
//   _id: 4, // or use a number that matches your schema
//     id: 4,
//     name: 'Investment Portfolio',
//     type: 'investment',
//     balance: 35250.80,
//     institution: 'Fidelity',
//     accountNumber: '1122334455'
//   }
// ];

// Mock monthly data for charts
export const mockMonthlyData: MonthlyData[] = [
  {
    month: 'Jan',
    income: 4200,
    expenses: 3100
  },
  {
    month: 'Feb',
    income: 4350,
    expenses: 2950
  },
  {
    month: 'Mar',
    income: 3900,
    expenses: 3300
  },
  {
    month: 'Apr',
    income: 4800,
    expenses: 3250
  },
  {
    month: 'May',
    income: 5100,
    expenses: 3500
  },
  {
    month: 'Jun',
    income: 4550,
    expenses: 3200
  },
  {
    month: 'Jul',
    income: 4300,
    expenses: 3000
  },
  {
    month: 'Aug',
    income: 4700,
    expenses: 3450
  },
  {
    month: 'Sep',
    income: 5000,
    expenses: 3600
  },
  {
    month: 'Oct',
    income: 4650,
    expenses: 3300
  },
  {
    month: 'Nov',
    income: 4850,
    expenses: 3500
  },
  {
    month: 'Dec',
    income: 5500,
    expenses: 4200
  }
];