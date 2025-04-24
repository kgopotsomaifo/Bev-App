const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const clubRoute = require("./routes/clubRoute");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const uri =
  process.env.MONGODB_URI


// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api", clubRoute);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
