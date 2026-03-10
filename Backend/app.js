require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Simple GET route
app.get("/", (req, res) => {
  res.send("Server is Up and Running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
