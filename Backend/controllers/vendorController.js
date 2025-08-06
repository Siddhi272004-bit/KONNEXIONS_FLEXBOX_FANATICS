// const Vendor = require('../models/Vendor');
// const bcrypt = require('bcryptjs');

// // @desc    Register a new vendor
// exports.registerVendor = async (req, res) => {
//   const { name, email, password, vendorid} = req.body;

//   try {
//     const existingVendor = await Vendor.findOne({ email });
//     if (existingVendor) {
//       return res.status(400).json({ message: 'Vendor already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newVendor = new Vendor({
//       name,
//       email,
//       password: hashedPassword,
//       vendorid
//     });

//     await newVendor.save();
//     res.status(201).json({ message: 'Vendor registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // @desc    Login vendor
// const loginVendor = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const vendor = await Vendor.findOne({ email });
//   const Vendor = require('../models/Vendor');

//   if (vendor && (await bcrypt.compare(password, vendor.password))) {
//     res.json({
//       _id: vendor._id,
//       name: vendor.name,
//       token: generateToken(vendor._id),
//       role: "vendor",
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid vendor credentials");
//   }
// });

const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');

const registerVendor = async (req, res) => {
  const { name, email, password, vendorID } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      vendorID,  // match with frontend field
    });

    await newVendor.save();
    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during vendor registration' });
  }
};

const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

// @desc    Auth vendor & get token
// @route   POST /api/vendors/login
// @access  Public
const loginVendor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const vendor = await Vendor.findOne({ email });

  if (vendor && (await bcrypt.compare(password, vendor.password))) {
    res.json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      token: generateToken(vendor._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

module.exports = {
  registerVendor,
  loginVendor
};


