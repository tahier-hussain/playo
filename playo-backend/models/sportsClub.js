const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SportsClubSchema = new Schema({
  club_name: {
    type: String,
    required: true
  },
  sports_type: {
    type: String,
    required: true
  },
  sports_type_id: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = SportsClub = mongoose.model("sports-club", SportsClubSchema);
