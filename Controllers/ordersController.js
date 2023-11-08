const express = require("express");
const Order = require("../Models/Order");
const Product = require("../Models/Product");
const verifyToken = require("../Middlewares/authMiddleware");

const router = express.Router();

router.use(verifyToken);

// Add Order endpoint
router.post("/add", async (req, res) => {
  try {
    const rawProducts = req.body.products;
    const total_price = req.body.total_price;
    const customer_id = req.body.customer_id;
    const user_id = req.user.id;

    // Validate the request body
    if (
      !Array.isArray(rawProducts) ||
      rawProducts.some((product) => !product._id || !product.product_name)
    ) {
      return res
        .status(400)
        .send(
          "Invalid request body: each product must have an _id and product_name."
        );
    }

    const products = rawProducts.map((product) => ({
      product_id: product._id,
      product_name: product.product_name,
      quantity: product.quantity, 
    }));

    const newOrder = new Order({
      user_id,
      products,
      total_price,
      customer_id: customer_id
    });

    await newOrder.save();
    res.status(201).send("Order added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/generateRandomOrders", async (req, res) => {
  try {
    const products = await Product.find({});

    for (let i = 0; i < 12; i++) {
      const orderCountForMonth = Math.floor(Math.random() * 9) + 2;

      for (let j = 0; j < orderCountForMonth; j++) {
        const randomProductIndex = Math.floor(Math.random() * products.length);
        const randomProduct = products[randomProductIndex];
        const randomQuantity = Math.floor(Math.random() * 10) + 1;

        const newOrder = new Order({
          user_id: "6534129b99745f0add6f96cf",
          customer_id: "653524054b45cfe4a70a61e6",
          products: [
            {
              product_id: randomProduct._id,
              product_name: randomProduct.product_name,
              quantity: randomQuantity,
            },
          ],
          total_price: randomProduct.price * randomQuantity,
          order_date: new Date(new Date().setMonth(new Date().getMonth() - i)),
        });

        await newOrder.save();
      }
    }

    res.status(200).send("Random orders generated successfully!");
  } catch (error) {
    res.status(500).send('Error generating random orders: ' + error.message);
  }
});

// Update Order endpoint
router.put("/update/:order_id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id);
    if (!order || order.user_id.toString() !== req.user.id) {
      return res.status(404).send("Order not found or unauthorized");
    }
    order.products = req.body.products || order.products;
    order.total_price = req.body.total_price || order.total_price;
    order.isPaid = req.body.isPaid || order.isPaid;
    await order.save();
    res.status(200).send("Order updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Delete Order endpoint
router.delete("/delete/:order_id", async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.order_id,
      user_id: req.user.id,
    });
    if (!order) {
      return res.status(404).send("Order not found or unauthorized");
    }
    await Order.findByIdAndDelete(req.params.order_id);
    res.status(200).send("Order deleted successfully");
  } catch (error) {
    console.log(error)
    res.status(500).send("Server error");
  }
});

// Get Order endpoint
router.get("/:order_id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id);
    if (!order || order.user_id.toString() !== req.user.id) {
      return res.status(404).send("Order not found or unauthorized");
    }

    // Enhance products with image_url
    const updatedProducts = await Promise.all(
      order.products.map(async (product) => {
        const productInfo = await Product.findById(product.product_id);
        if (productInfo) {
          return { ...product.toObject(), image_url: productInfo.image_url };
        } else {
          return {
            ...product.toObject(),
            image_url: "https://i.imgur.com/ic76D7q.jpg",
          };
        }
      })
    );

    res.status(200).json({ ...order.toObject(), products: updatedProducts });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// List all orders for the logged-in user
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id });

    const updatedOrders = await Promise.all(
      orders.map(async (order) => {
        const updatedProducts = await Promise.all(
          order.products.map(async (product) => {
            const productInfo = await Product.findById(product.product_id);
            if (productInfo) {
              return {
                ...product.toObject(),
                image_url: productInfo.image_url,
              };
            } else {
              return {
                ...product.toObject(),
                image_url: "https://i.imgur.com/ic76D7q.jpg",
              };
            }
          })
        );

        return { ...order.toObject(), products: updatedProducts };
      })
    );

    res.status(200).json(updatedOrders);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
