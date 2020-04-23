const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});
