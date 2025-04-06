const mongoose = require('mongoose');

// Define schema
const vendorSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    vendorID: String
});

// Export model
module.exports = mongoose.model("vendor", vendorSchema);
