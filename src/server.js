const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app = require("./app");

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

console.log("Loaded MONGO_URI:", process.env.MONGO_URI); // DEBUG

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });
