const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  
  semester:{
    type:String,
    default:null,
  },

  branch: {
   type:String, 
   default:null
  },

  subject: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: null,
  },

   teacher:{
     type:String,
     default:null
   },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = Class = mongoose.model("class", classSchema);
