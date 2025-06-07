import Account from "../models/account.model.js";
import Budget from "../models/budget.model.js";
import Transaction from "../models/transcation.model.js";

export const addTransaction = async (req, res) => {
  try {
    const { description, amount, date, type, accountId, category } = req.body;
    if (!description || !amount || !date || !type || !accountId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 1. Create transaction
    const transaction = new Transaction({
      description,
      amount,
      date,
      type,
      accountId: req.body.accountId,
      category: req.body.category,
      userId: req.user.id,
    });
    await transaction.save();

    // 2. Update account balance
    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: "Account not found" });
    if (type === "expense") {
      account.balance -= amount;
    } else {
      account.balance += amount;
    }
    await account.save();

    // 3. Update budget spent (if category and budget exist)
    if (category) {
      const budget = await Budget.findOne({ userId: req.user.id, category });
      if (budget) {
        budget.spent += type === "expense" ? amount : 0;
        await budget.save();
      }
    }

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
      { description, amount, date, type },
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

// // Create a recurring transaction
// export const createRecurringTransaction = async (req, res) => {
//   try {
//     const { amount, type, category, description, frequency, startDate } =
//       req.body;
//     if (!["daily", "weekly", "monthly"].includes(frequency)) {
//       return res.status(400).json({ message: "Invalid frequency" });
//     }
//     const nextOccurrence = startDate ? new Date(startDate) : new Date();
//     const txn = await Transaction.create({
//       userId: req.user.id,
//       amount,
//       type,
//       category,
//       description,
//       recurring: true,
//       frequency,
//       nextOccurrence,
//       date: nextOccurrence,
//     });
//     res.status(201).json(txn);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to create recurring transaction",
//       error: err.message,
//     });
//   }
// };

// export const getRecurringTransactions = async (req, res) => {
//   try {
//     const txns = await Transaction.find({
//       userId: req.user.id,
//       recurring: true,
//     }).sort({ nextOccurrence: 1 });
//     res.json(txns);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch recurring transactions",
//       error: err.message,
//     });
//   }
// };

// export const deleteRecurringTransaction = async (req, res) => {
//   try {
//     const txn = await Transaction.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id,
//       recurring: true,
//     });
//     if (!txn)
//       return res
//         .status(404)
//         .json({ message: "Recurring transaction not found" });
//     res.json({ message: "Recurring transaction deleted" });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to delete recurring transaction",
//       error: err.message,
//     });
//   }
// };

// export const updateRecurringTransaction = async (req, res) => {
//   try {
//     const { amount, type, category, description, frequency, nextOccurrence } =
//       req.body;
//     const txn = await Transaction.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id, recurring: true },
//       { amount, type, category, description, frequency, nextOccurrence },
//       { new: true }
//     );
//     if (!txn)
//       return res
//         .status(404)
//         .json({ message: "Recurring transaction not found" });
//     res.json(txn);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to update recurring transaction",
//       error: err.message,
//     });
//   }
// };

// export const processRecurringTransactions = async () => {
//   try {
//     const now = new Date();
//     const txns = await Transaction.find({
//       userId: req.user.id,
//       recurring: true,
//       nextOccurrence: { $lte: now },
//     });

//     for (const txn of txns) {
//       // Create a new transaction for the next occurrence
//       const newTxn = new Transaction({
//         userId: txn.userId,
//         amount: txn.amount,
//         type: txn.type,
//         category: txn.category,
//         description: txn.description,
//         date: now,
//       });
//       await newTxn.save();

//       // Update the next occurrence based on frequency
//       if (txn.frequency === "daily") {
//         txn.nextOccurrence.setDate(txn.nextOccurrence.getDate() + 1);
//       } else if (txn.frequency === "weekly") {
//         txn.nextOccurrence.setDate(txn.nextOccurrence.getDate() + 7);
//       } else if (txn.frequency === "monthly") {
//         txn.nextOccurrence.setMonth(txn.nextOccurrence.getMonth() + 1);
//       }
//       await txn.save();
//     }
//   } catch (err) {
//     console.error("Failed to process recurring transactions:", err.message);
//   }
// };
