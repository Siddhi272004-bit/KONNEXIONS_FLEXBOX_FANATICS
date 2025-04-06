const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'venue',
    required: true
  },
  venueName: { // 🔥 optional: easy to query by name without populating
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String, // e.g., "14:00"
    required: true
  },
  endTime: {
    type: String, // e.g., "17:00"
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  qrCode: {
    type: String // This will store the base64 image data for the QR
  }
  
});

module.exports = mongoose.model('Booking', bookingSchema);
