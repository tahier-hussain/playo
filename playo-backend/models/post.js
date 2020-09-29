const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sports_club_id: {
    type: String,
    required: true
  },
  sports_club_name: {
    type: String,
    required: true
  },
  sports_type_id: {
    type: String,
    required: true
  },
  sports_type_name: {
    type: String,
    required: true
  },
  no_of_slots: {
    type: String,
    required: true
  },
  no_of_slots_available: {
    type: String,
    required: false
  },
  date_of_event: {
    type: String,
    required: true
  },
  time_of_event: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
