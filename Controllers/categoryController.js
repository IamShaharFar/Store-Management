const express = require("express");
const Category = require("../Models/Category");
const Product = require("../Models/Product");
const verifyToken = require("../Middlewares/authMiddleware");

const router = express.Router();

router.use(verifyToken);

// Add Category endpoint
router.post("/add-category", async (req, res) => {
  try {
    const { name, description } = req.body;

    const newCategory = new Category({
      user_id: req.user.id,
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

router.post("/add-sample-categories", async (req, res) => {
  try {
    const sampleCategories = [
      { name: "Electronics", description: "Gadgets and tech gear" },
      { name: "Clothing", description: "Apparels for all genders and ages" },
      { name: "Beauty", description: "Beauty products and cosmetics" },
      { name: "Home Decor", description: "Decorative items for home" },
      { name: "Books", description: "Printed books and e-books" },
      { name: "Outdoor", description: "Products for outdoor activities" },
      {
        name: "Health & Fitness",
        description: "Products for a healthy lifestyle",
      },
      { name: "Toys", description: "Toys and games for kids" },
      { name: "Grocery", description: "Daily grocery items" },
      { name: "Footwear", description: "Shoes, sandals, and other footwears" },
    ];

    await Category.insertMany(sampleCategories);
    res.status(200).send({ message: "Sample categories added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to add sample categories" });
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
