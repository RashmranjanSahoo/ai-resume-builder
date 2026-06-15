const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const userRouter = require("./routes/UserRoutes");
const resumeRouter = require('./routes/resumeRoutes')
const aiRoutes = require("./routes/aiRoutes");


const app = express();
const PORT = process.env.PORT || 3000;
// database connection

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);


app.get('/',(req,res)=>{
    res.send("server is live");
})

app.use('/api/users',userRouter);
app.use('/api/resumes', resumeRouter);

app.listen(PORT, () => {
  console.log("Server running");
});


