const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SportsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
    defualt: "no-sport-image.jpg"
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sports = mongoose.model("sport", SportsSchema);
