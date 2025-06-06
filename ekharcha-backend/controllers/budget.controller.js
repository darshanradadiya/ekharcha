import Budget from "../models/budget.model.js";

export const createBudget = async (req, res) => {
  const { category, budgeted, spent } = req.body;
  try {
    if (!category || budgeted === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBudget = new Budget({
      category,
      budgeted,
      spent,
      userId: req.user.id,
    });

    await newBudget.save();
    return res.status(201).json({
      message: "Budget created successfully",
      budget: newBudget,
    });
  } catch (error) {
    console.error("Error creating budget:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    return res.status(200).json({ budgets });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { category, budgeted, spent } = req.body;

  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    if (budget.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    budget.category = category || budget.category;
    budget.budgeted = budgeted !== undefined ? budgeted : budget.budgeted;
    budget.spent = spent !== undefined ? spent : budget.spent;

    await budget.save();
    return res.status(200).json({
      message: "Budget updated successfully",
      budget,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    if (budget.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await budget.remove();
    return res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    if (budget.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return res.status(200).json(budget);
  }
  catch (error) {
    console.error("Error fetching budget:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getBudgetsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const budgets = await Budget.find({
      userId: req.user.id,
      category: new RegExp(category, 'i'), // Case-insensitive search
    });

    return res.status(200).json({ budgets });
  } catch (error) {
    console.error("Error fetching budgets by category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addSpentToBudget = async (req, res) => {
  const { category } = req.body;
  const { amount } = req.body; // amount to add to spent

  if (!category || typeof amount !== "number") {
    return res.status(400).json({ message: "Category and amount are required" });
  }

  try {
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user.id, category },
      { $inc: { spent: amount } },
      { new: true }
    );
    if (!budget) {
      return res.status(404).json({ message: "Budget category not found" });
    }
    return res.status(200).json({ budget });
  } catch (error) {
    console.error("Error updating spent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};