import Budget from "../models/budget.model.js";

export const createOrUpdateBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id; // Assume user is authenticated and req.user is populated

    if (!amount || amount < 0) {
      return res.status(400).json({ message: "Valid amount is required." });
    }

    let budget = await Budget.findOne({ userId });

    if (budget) {
      budget.amount = amount;
      await budget.save();
      return res
        .status(200)
        .json({ message: "Budget updated successfully", budget });
    }

    budget = new Budget({ userId, amount });
    await budget.save();

    res.status(201).json({ message: "Budget created successfully", budget });
  } catch (error) {
    console.error("Create/Update Budget Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBudgetByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const budget = await Budget.findOne({ userId });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json(budget);
  } catch (error) {
    console.error("Fetch Budget Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const userId = req.user._id;

    const budget = await Budget.findOneAndDelete({ userId });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json({ message: "Budget deleted" });
  } catch (error) {
    console.error("Delete Budget Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLastAlertSent = async (req, res) => {
  try {
    const userId = req.user._id;

    const budget = await Budget.findOne({ userId });
    if (!budget) return res.status(404).json({ message: "Budget not found" });

    budget.lastAlertSent = new Date();
    await budget.save();

    res.status(200).json({ message: "Last alert date updated", budget });
  } catch (error) {
    console.error("Update Alert Date Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
