require("dotenv").config();
const express = require('express');
const cors = require('cors');
;
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const path=require('path');
const { connect } = require("http2");

const app =express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET","POST", 'PUT',"DELETE"],
        allowedHeaders: ["Content-Type","Authorization"],
    })
);

app.use(express.json());

connectDB();


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);


//Serve upload folder
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

const PORT  = process.env.PORT||5000;
app.listen(PORT,()=> console.log(`Server running at port ${PORT}`));