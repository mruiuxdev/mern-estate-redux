import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authUser from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authUser);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({ success: false, statusCode, message });
});

const PORT = process.env.PORT ?? 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
