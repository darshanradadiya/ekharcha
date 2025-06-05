import Transaction from "../models/transcation.model.js";

// Add a transaction
export const addTransaction = async (req, res) => {
  try {
    const { description, amount, date, type } = req.body;
    if (!description || !amount || !date || !type) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const transaction = new Transaction({
      description,
      amount,
      date,
      type,
      userId: req.user.id,
    });
    await transaction.save();
    res.status(201).json({ transaction });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add transaction", error: err.message });
  }
};

// Get all transactions for the logged-in user
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: err.message });
  }
};

// (Optional) Get a single transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const txn = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!txn) return res.status(404).json({ message: "Transaction not found" });
    res.json({ transaction: txn });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch transaction", error: err.message });
  }
};

// (Optional) Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const txn = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!txn) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete transaction", error: err.message });
  }
};

// (Optional) Edit a transaction
export const editTransaction = async (req, res) => {
  try {
    const { description, amount, date, type } = req.body;
    const txn = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { description, amount , date, type },
      { new: true }
    );
    if (!txn) return res.status(404).json({ message: "Transaction not found" });
    res.json({ transaction: txn });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update transaction", error: err.message });
  }
};
