import Account from "../models/account.model.js";

// CREATE ACCOUNT
export const createAccount = async (req, res) => {
  const { name, type, balance, institution, accountNumber } = req.body;

  try {
    // Validate required fields
    if (
      !name ||
      !type ||
      balance === undefined ||
      !institution ||
      !accountNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optionally: check for duplicate accountNumber for this user
    const existing = await Account.findOne({
      accountNumber,
      userId: req.user.id,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Account with this number already exists" });
    }

    const newAccount = new Account({
      name,
      type,
      balance,
      institution,
      accountNumber,
      userId: req.user.id,
    });

    await newAccount.save();
    return res.status(201).json({
      message: "Account created successfully",
      account: newAccount,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE ACCOUNT
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { name, type, balance, institution, accountNumber } = req.body;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update fields if provided
    if (name !== undefined) account.name = name;
    if (type !== undefined) account.type = type;
    if (balance !== undefined) account.balance = balance;
    if (institution !== undefined) account.institution = institution;
    if (accountNumber !== undefined) account.accountNumber = accountNumber;

    await account.save();
    return res.status(200).json({
      message: "Account updated successfully",
      account,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/account.controller.js
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    return res.status(200).json({ accounts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return res.status(200).json(account);
  } catch (error) {
    console.error("Error fetching account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    // If account has no userId, allow delete (for cleanup)
    if (!account.userId) {
      await Account.findByIdAndDelete(id);
      return res.status(200).json({ message: "Account deleted (no userId)" });
    }
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Account.findByIdAndDelete(id);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const searchtype = async (req, res) => {
  const { type } = req.query;
  try {
    if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }
    const accounts = await Account.find({ type: type });
    return res.status(200).json(accounts); // <-- Fix: return accounts, not Accounts
  } catch (error) {
    console.error("Error searching accounts by type:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(Accounts);
};
