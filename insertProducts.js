const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rana_prince15:YOUR_PASSWORD@cluster0.j2ykulw.mongodb.net/3dVisualizerDB?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("3dVisualizerDB");
    const products = db.collection("products");

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
    console.log(`✅ Inserted ${result.insertedCount} products`);
  } catch (err) {
    console.error("❌ Error inserting products:", err.message);
  } finally {
    await client.close();
  }
}

run();

