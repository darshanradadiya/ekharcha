import Account from "../models/account.model.js";
import Transaction from "../models/transcation.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch transactions
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    const totalIncome = transactions
      .filter(txn => txn.type === "income")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const totalExpense = transactions
      .filter(txn => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0);

    const balance = totalIncome - totalExpense;
    const recentTransactions = transactions.slice(0, 5);

    // Fetch accounts
    const accounts = await Account.find({ userId });

    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const assetsBalance = accounts
      .filter(acc => acc.type !== "credit")
      .reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const liabilitiesBalance = accounts
      .filter(acc => acc.type === "credit")
      .reduce((sum, acc) => Math.abs(sum) + Math.abs(acc.balance || 0), 0);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      recentTransactions,
      totalBalance,
      assetsBalance,
      liabilitiesBalance,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: err.message });
  }
};