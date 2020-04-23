const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  class: {
    type: String,
    default: null,
  },
  subject: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Class = mongoose.model("class", classSchema);
