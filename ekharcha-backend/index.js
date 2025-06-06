import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import accountRoutes from "./routes/account.route.js";
import budgetRoutes from "./routes/budget.route.js";
import categoryRoutes from "./routes/category.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
// import recurringRoutes from "./routes/recurring.route.js";
import reportRoutes from "./routes/report.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import authRoutes from "./routes/user.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000 
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

// ✅ Middleware
app.use(express.json());

app.use(cors({
  // origin: 'https://ekharcha-production.up.railway.app', // For production, replace with your frontend domain like: 'https://yourapp.com'
  origin: "*", // For development, allow all origins
  // origin : "http://192.168.99.195:8000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);
// app.use("/api/recurring", recurringRoutes);
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  });
