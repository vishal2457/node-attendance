const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  classId: {
    type: String,
    default: null,
  },
  percent: {
    type: String,
    default: null,
  },
  isSafe: {
    type: String,
    default: null,
  },
});

module.exports = Students = mongoose.model("student", studentSchema);
