import mongoose from "mongoose";

const connectDB = () => {
  const MONGODB_URI = `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`;

  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

export default connectDB;
