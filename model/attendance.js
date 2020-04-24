const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attSchema = new Schema({
  date: {
    type: Date,
    default: null,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "student",
    default: null,
  },
  studenetName: {
    type: String,
    default: null,
  },
  isPresent: {
    type: Boolean,
    default: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "class",
    default: null,
  },
});
