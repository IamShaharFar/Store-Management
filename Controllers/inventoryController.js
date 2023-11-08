const express = require("express");
const Product = require("../Models/Product");
const multer = require("multer");
const axios = require("axios");
const verifyToken = require("../Middlewares/authMiddleware");

const upload = multer();

const router = express.Router();

router.use(verifyToken);

// Function to handle image upload to Imgur
async function uploadImageToImgur(imageBuffer) {
  try {
    const imgurResponse = await axios.post(
      "https://api.imgur.com/3/image",
      { image: imageBuffer },
      { headers: { Authorization: "Client-ID 2b8c8f4b12147ec" } }
    );
    return imgurResponse.data.data.link;
  } catch (error) {
    console.error("Error uploading to Imgur:", error.response ? error.response.data : error);
    throw new Error("Imgur upload failed");
  }
}

// Add Product endpoint
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("ddd")
    const {
      product_name,
      product_description,
      stock_quantity,
      price,
      barcode,
    } = req.body;

    let imageUrl = null;
    if (req.file) {
      // console.log(req.file)
      const imageBuffer = req.file.buffer.toString("base64");
      imageUrl = await uploadImageToImgur(imageBuffer);
    }
    else{
      imageUrl="https://i.imgur.com/HZHpc0y.png";
    }

    const newProduct = new Product({
      user_id: req.user.id,
      product_name,
      product_description,
      stock_quantity,
      price,
      barcode,
      image_url: imageUrl,
    });

    await newProduct.save();

    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

router.post('/add-sample-products', async (req, res) => {
  // Sample products
  const sampleProducts = [
    { user_id: "6534129b99745f0add6f96cf", product_name: "BluTech Earbuds", product_description: "Wireless Bluetooth earbuds with high-fidelity sound and noise cancellation.", price: 59.99, stock_quantity: 100, barcode: "001001001001", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "EcoFibre Tee", product_description: "Sustainable cotton t-shirt available in various colors.", price: 29.49, stock_quantity: 75, barcode: "002002002002", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "NatureGlow Serum", product_description: "Organic face serum enriched with Vitamin C.", price: 45.00, stock_quantity: 50, barcode: "003003003003", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "TimeCraft Clock", product_description: "Handcrafted wooden clock with a minimalist design.", price: 38.99, stock_quantity: 125, barcode: "004004004004", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "Digital Marketing Guide", product_description: "300+ page handbook written by industry experts.", price: 24.99, stock_quantity: 100, barcode: "005005005005", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "AR Puzzle Galaxy", product_description: "Augmented reality-powered puzzle set with 500 pieces.", price: 32.49, stock_quantity: 80, barcode: "006006006006", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "Cafe Aroma Beans", product_description: "Gourmet coffee beans, single-origin, roasted to perfection.", price: 18.99, stock_quantity: 60, barcode: "007007007007", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "Luna Silver Necklace", product_description: "Sterling silver pendant necklace with ethically sourced materials.", price: 62.00, stock_quantity: 40, barcode: "008008008008", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "Yoga Balance Mat", product_description: "Non-slip yoga mat designed for optimal grip and comfort.", price: 27.49, stock_quantity: 90, barcode: "009009009009", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "KitchenCraft Blender", product_description: "High-speed blender perfect for smoothies and more.", price: 89.99, stock_quantity: 95, barcode: "010010010010", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "Breezy Summer Hat", product_description: "Stylish and protective sun hat for the summer season.", price: 15.49, stock_quantity: 85, barcode: "011011011011", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "EcoSip Reusable Bottle", product_description: "Sustainable water bottle with temperature retention.", price: 25.00, stock_quantity: 70, barcode: "012012012012", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "TravelPack Backpack", product_description: "Durable and spacious backpack ideal for travelers.", price: 47.49, stock_quantity: 65, barcode: "013013013013", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "NightGlow Lamp", product_description: "Ambient bedside lamp with customizable light settings.", price: 34.99, stock_quantity: 55, barcode: "014014014014", image_url: "https://i.imgur.com/HZHpc0y.png" },
    { user_id: "6534129b99745f0add6f96cf", product_name: "SketchMaster Art Set", product_description: "Premium art set with colored pencils, pastels, and more.", price: 29.49, stock_quantity: 45, barcode: "015015015015", image_url: "https://i.imgur.com/HZHpc0y.png" }
];



  try {
      await Product.insertMany(sampleProducts);
      res.status(200).send({ message: "Sample products added successfully!" });
  } catch (error) {
    console.log(error)
      res.status(500).send({ error: "Failed to add sample products" });
  }
});

// Update Product endpoint
router.put("/update/:product_id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);
    if (!product || product.user_id.toString() !== req.user.id) {
      return res.status(404).send("Product not found or unauthorized");
    }

    for (let key in req.body) {
      if (product[key] !== undefined) {
        product[key] = req.body[key];
      }
    }

    let imageUrl = null;
    if (req.file) {
      const imageBuffer = req.file.buffer.toString("base64");
      imageUrl = await uploadImageToImgur(imageBuffer);
      product.image_url = imageUrl;
    }

    await product.save();

    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.log(error)
    res.status(500).send("Server error");
  }
});

// Delete Product endpoint
router.delete("/delete/:product_id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.product_id,
      user_id: req.user.id,
    });
    if (!product || product.user_id.toString() !== req.user.id) {
      return res.status(404).send("Product not found or unauthorized");
    }

    await Product.findByIdAndDelete(req.params.product_id);

    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Get Product endpoint
router.get("/:product_id", async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.product_id,
      user_id: req.user.id,
    });
    if (!product || product.user_id.toString() !== req.user.id) {
      return res.status(404).send("Product not found or unauthorized");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// List Products endpoint
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.user.id });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
