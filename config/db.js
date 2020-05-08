const config = require("config");
const mongoose = require("mongoose");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database successfully connected..");
  } catch (err) {
    console.log("Error during connection of database..", err);
    process.exit();
  }
};

module.exports = connectDB;
