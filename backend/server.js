require("dotenv").config();
const express = require('express');
const cors = require('cors');
;
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

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

const PORT  = process.env.PORT||5000;
app.listen(PORT,()=> console.log(`Server running at port ${PORT}`));