const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const clubRoute = require("./routes/clubRoute");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://Kgopotso:codelord44@hyperiondev.vazzp.mongodb.net/bev-app?retryWrites=true&w=majority";
// const uri =
//   "mongodb+srv://Kgopotso:codelord44@hyperiondev.vazzp.mongodb.net/?retryWrites=true&w=majority&appName=Hyperiondev";

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
