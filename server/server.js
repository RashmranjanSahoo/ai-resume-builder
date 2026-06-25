const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/UserRoutes");
const resumeRouter = require('./routes/resumeRoutes');
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
app.get('/', (req, res) => {
  res.send("server is live");
});
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use("/api/ai", aiRoutes);

// ✅ Single app.listen inside connectDB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    if (err.message.includes("querySrv")) {
      console.error(
        "MongoDB Atlas SRV lookup failed. Check your internet connection, DNS settings, VPN/firewall, or use the standard mongodb:// Atlas connection string instead of mongodb+srv://."
      );
    }
    process.exit(1);
  });
