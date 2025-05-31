import Transaction from "../models/transcation.model.js";

// Helper: Check required fields
const validateTransactionFields = ({
  amount,
  description,
  date,
  mode,
  type,
}) => {
  return amount && description && date && mode && type;
};

// Add Transaction (generic)
export const addTransaction = async (req, res) => {
  const {
    amount,
    description,
    date,
    mode,
    type,
    status = "PENDING",
    isRecurring = false,
    recurringInterval = null,
    nextRecurringDate = null,
    lastProcessedDate = null,
    receiptUrl = "",
    categoryId,
    accountId,
    tripId,
  } = req.body;

  if (!validateTransactionFields({ amount, description, date, mode, type })) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const transaction = new Transaction({
      amount,
      description,
      date: new Date(date),
      mode,
      type,
      status,
      isRecurring,
      recurringInterval,
      nextRecurringDate: nextRecurringDate ? new Date(nextRecurringDate) : null,
      lastProcessedDate: lastProcessedDate ? new Date(lastProcessedDate) : null,
      receiptUrl,
      categoryId,
      accountId,
      tripId,
      userId: req.user.id,
    });

    await transaction.save();
    res
      .status(201)
      .json({ message: "Transaction added successfully", transaction });
  } catch (error) {
    console.error("Add Transaction Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all user transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .populate("categoryId", "name")
      .populate("accountId", "name")
      .populate("tripId", "name");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Fetch All Transactions Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("categoryId", "name")
      .populate("accountId", "name")
      .populate("tripId", "name");

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Fetch Transaction by ID Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit Transaction (Generic)
export const editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const {
      amount,
      description,
      date,
      mode,
      status,
      accountId,
      categoryId,
      tripId,
      isRecurring,
      recurringInterval,
      receiptUrl,
    } = req.body;

    Object.assign(transaction, {
      amount: amount ?? transaction.amount,
      description: description ?? transaction.description,
      date: date ? new Date(date) : transaction.date,
      mode: mode ?? transaction.mode,
      status: status ?? transaction.status,
      accountId: accountId ?? transaction.accountId,
      categoryId: categoryId ?? transaction.categoryId,
      tripId: tripId ?? transaction.tripId,
      isRecurring: isRecurring ?? transaction.isRecurring,
      recurringInterval: recurringInterval ?? transaction.recurringInterval,
      receiptUrl: receiptUrl ?? transaction.receiptUrl,
    });

    await transaction.save();

    res
      .status(200)
      .json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    console.error("Edit Transaction Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await transaction.deleteOne();

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Delete Transaction Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get transactions by type (INCOME / EXPENSE)
export const getTransactionsByType = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
      type: req.params.type.toUpperCase(),
    })
      .populate("categoryId", "name")
      .populate("accountId", "name")
      .populate("tripId", "name");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Get Transactions by Type Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Calculate total amount by type
export const calculateTotalAmount = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: req.user.id,
          type: req.params.type.toUpperCase(),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({ total: result[0]?.total || 0 });
  } catch (error) {
    console.error("Calculate Total Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Transaction summary (INCOME, EXPENSE, BALANCE)
export const getTransactionSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const result = { INCOME: 0, EXPENSE: 0 };
    summary.forEach((item) => (result[item._id] = item.total));
    const balance = result.INCOME - result.EXPENSE;

    res.status(200).json({ ...result, balance });
  } catch (error) {
    console.error("Get Summary Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Monthly summary grouped by type
export const getMonthlySummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Monthly Summary Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Transactions by category
export const getTransactionsByCategory = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
      categoryId: req.params.categoryId,
    })
      .populate("categoryId", "name")
      .populate("accountId", "name")
      .populate("tripId", "name");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Category Transactions Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Transactions by account
export const getTransactionsByAccount = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
      accountId: req.params.accountId,
    })
      .populate("categoryId", "name")
      .populate("accountId", "name")
      .populate("tripId", "name");

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Account Transactions Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Category-wise summary
export const getCategorywiseSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: "$categoryId",
          total: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          _id: 0,
          categoryName: "$category.name",
          total: 1,
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error("Category Summary Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
