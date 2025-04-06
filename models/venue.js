const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor', // links to the vendor who created the venue
    required: false // optional for now (since seedVenues doesn't include it)
  }
});

module.exports = mongoose.model('venue', venueSchema);
