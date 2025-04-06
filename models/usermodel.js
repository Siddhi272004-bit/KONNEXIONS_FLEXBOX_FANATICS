const mongoose = require('mongoose');

// define schema
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model("user", userSchema);
