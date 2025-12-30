const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//check API
app.get("/", (req, res) => {
  res.send("API is working!");
})

app.use(errorHandler);

module.exports = app;
