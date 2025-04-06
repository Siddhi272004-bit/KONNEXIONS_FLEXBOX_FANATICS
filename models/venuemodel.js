// models/venue.js
const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: String,
  location: String,
  capacity: Number,
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor'
  }
});

module.exports = mongoose.model('venue', venueSchema);
