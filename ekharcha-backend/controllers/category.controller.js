import Category from "../models/catagory.model.js";

export const createCategory = async (req, res) => {
  try {
    const { label, type } = req.body;

    if (!label || !type) {
      return res.status(400).json({ message: "Label and type are required." });
    }

    const category = new Category({ label, type });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, type } = req.body;

    if (!label || !type) {
      return res.status(400).json({ message: "Label and type are required." });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { label, type },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;

    if (!["INCOME", "EXPENSE"].includes(type.toUpperCase())) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const categories = await Category.find({ type: type.toUpperCase() });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fetch Categories by Type Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCategoryByLabel = async (req, res) => {
  try {
    const { label } = req.params;

    const category = await Category.findOne({ label });
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Get Category by Label Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCategoriesByTypeAndLabel = async (req, res) => {
  try {
    const { type, label } = req.params;

    if (!["INCOME", "EXPENSE"].includes(type.toUpperCase())) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const categories = await Category.find({ type: type.toUpperCase(), label });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fetch Categories by Type and Label Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
