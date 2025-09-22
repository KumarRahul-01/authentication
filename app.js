const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./app/config/db");
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('uploads',express.static('uploads'));

const userRouter = require("./app/router/userRouter");
app.use(userRouter);

const productRouter= require("./app/router/productRouter");
app.use(productRouter);

const studentRouter=require("./app/router/studentRouter");
app.use(studentRouter);

PORT = 3007;

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
