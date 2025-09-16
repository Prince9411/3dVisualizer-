const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db, products;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("3dVisualizerDB");
    products = db.collection("products");
    console.log(" Connected to MongoDB Atlas (via Express)");
  } catch (err) {
    console.error(" MongoDB Connection Failed:", err.message);
  }
}
connectDB();

app.get("/", (req, res) => {
  res.send("3D Visualizer API is running ✅");
});

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await products.find().toArray();
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await products.findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Invalid product ID" });
  }
});

app.get("/api/insert-sample", async (req, res) => {
  try {
    await products.deleteMany({});

    const sampleProducts = [
        {
    name: "Modern Chair",
    category: "Furniture",
    price: 120,
     image: "https://3d-visualizer-frontend.netlify.app/assets/chair.jpeg",
        model: "https://3d-visualizer-frontend.netlify.app/assets/Duck.glb"
  },
  {
    name: "Wooden Table",
    category: "Furniture",
    price: 250,
     image: "https://3d-visualizer-frontend.netlify.app/assets/table.webp",
        model: "https://3d-visualizer-frontend.netlify.app/assets/Duck.glb"
  },
  {
    name: "Decorative Lamp",
    category: "Lighting",
    price: 80,
      image: "https://3d-visualizer-frontend.netlify.app/assets/lamp.jpeg",
        model: "https://3d-visualizer-frontend.netlify.app/assets/Duck.glb"
  }
    ];

    const result = await products.insertMany(sampleProducts);
    res.json({
      message: " Sample products reset and inserted!",
      insertedCount: result.insertedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to insert sample products" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));



