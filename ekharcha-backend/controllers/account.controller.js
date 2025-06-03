import Account from "../models/account.model.js";

export const createAccount = async (req, res) => {
  const { name, email, username } = req.body;

  try {
    if (!name || !email) {
      return res.status(400).json({ message: "Name, email are required" });
    }

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newAccount = new Account({
      name,
      email,
      username: username || email, // Use email as username if not provided
      userId: req.user.id, // Assuming req.user.id is set by authentication middleware
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

export const getAccounts = async (req, res) => {
  try {
    
    const accounts = await Account.find();
    return res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
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

export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (!account.userId) {
      await Account.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json({ message: "Account updated (no userId)", account });
    }
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updatedAccount = await Account.findByIdAndUpdate(id, updateData, { new: true });
    return res.status(200).json({ message: "Account updated successfully", account: updatedAccount });
  } catch (error) {
    console.error("Error updating account:", error);
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
