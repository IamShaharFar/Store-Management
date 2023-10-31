const express = require("express");
const Category = require("../models/Category");
const Product = require("../Models/Product");
const verifyToken = require("../Middlewares/authMiddleware");

const router = express.Router();

router.use(verifyToken);

// Add Category endpoint
router.post("/add-category", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();
    res.status(201).send("Category added successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

// Remove Category endpoint
router.delete("/remove-category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await Product.updateMany(
      { categories: categoryId },
      { $pull: { categories: categoryId } }
    );

    await Category.findByIdAndDelete(categoryId);

    res.status(200).send("Category removed successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

// Update Category endpoint
router.put("/update-category/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    category.name = name;
    category.description = description;
    await category.save();
    res.status(200).send("Category updated successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

// Get a single category endpoint
router.get("/get-category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

// Get all categories endpoint
router.get("/get-all-categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
