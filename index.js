const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rana_prince15:tokuleke@cluster0.j2ykulw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log(" Connected to MongoDB Atlas!");

    const db = client.db("3dVisualizerDB"); 
    const collection = db.collection("testCollection");

    const result = await collection.insertOne({ name: "Prince", date: new Date() });
    console.log("Inserted document _id:", result.insertedId);

   
    const docs = await collection.find({}).toArray();
    console.log("Documents:", docs);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
