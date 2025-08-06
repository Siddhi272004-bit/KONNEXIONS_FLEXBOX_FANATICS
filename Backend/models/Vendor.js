// const mongoose = require('mongoose');

// const vendorSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   company: String
// }, { collection: 'Bookeasy_Vendor' });  

// const Vendor = mongoose.model('Vendor', vendorSchema);
// module.exports = Vendor;

const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  vendorID: String,  // Match frontend
}, { collection: 'Bookeasy_Vendor' });

module.exports = mongoose.model('Vendor', vendorSchema);
