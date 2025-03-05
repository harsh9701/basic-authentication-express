require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./config/mongodb");
const userRoute = require("./routes/user.routes");

connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.listen(3000, () => {
    console.log("Sever is running");
});