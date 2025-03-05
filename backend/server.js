const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB connection error: ", err));

app.use("/api/auth", authRoutes);

// Home endpoint (védett)
app.get("/api/home", authMiddleware, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.username}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
