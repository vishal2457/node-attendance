const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: 0,
  },
  date: {
    type: Date,
    default: null,
  },
  college: {
    type: String,
    default: null,
  },
  branch: {
    type: String,
    default: null,
  },
});

module.exports = User = mongoose.model("user", userSchema);
