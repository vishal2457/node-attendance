const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  semester: {
    type: String,
    default: null,
  },
  branch: {
    type: String,
    default: null,
  },
  subject:{
    type:String,
    default:null
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "class",
    default: null,
  },
  enroll: {
    type: Number,
    default: String,
  },
  percent: {
    type: String,
    default: null,
  },
  present: {
    type: Boolean,
    default: true,
  },
  absent: {
    type: Boolean,
    default: 0,
  },
  isSafe: {
    type: String,
    default: null,
  },
});

module.exports = Students = mongoose.model("student", studentSchema);
