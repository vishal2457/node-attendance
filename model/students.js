const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  className: {
    type: String,
    default: null,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "class",
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
