import mongoose from "mongoose";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export default async function connectDatabase(uri) {
  if (!uri) {
    throw new Error("Please define the MONGO_URI environment variable");
  }
  try {
    await mongoose.connect(uri, clientOptions);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(`Error connecting to mongo DB → ${error.message}`);
    throw error;
  }
}
