const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
