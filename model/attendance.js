const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attSchema = new Schema({
  date: {
    type: Date,
    default: null,
  },
  present: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "students",
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
    },
  ],
  absent: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "students",
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
    },
  ],
});

module.exports = attendance = mongoose.model("attendance", attSchema);
