const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MemberSchema = new Schema({
  event_id: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Member = mongoose.model("members", MemberSchema);
