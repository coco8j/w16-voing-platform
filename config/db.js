const mongoose = require("mongoose");

async function connectMongoose(dbUri) {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("connection error:", error);
  }
}

connectMongoose(process.env.DATABASE_URI);
