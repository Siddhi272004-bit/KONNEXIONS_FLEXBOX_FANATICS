// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const Vendor = require('../models/vendormodel');

// // Register Vendor
// router.post('/register', async (req, res) => {
//   const { name, username, email, password, vendorID } = req.body;

//   try {
//     const existingVendor = await Vendor.findOne({ email });
//     if (existingVendor)
//       return res.status(400).json({ message: 'Vendor already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newVendor = new Vendor({
//       name,
//       username,
//       email,
//       password: hashedPassword,
//       vendorID
//     });

//     await newVendor.save();
//     res.status(201).json({ message: 'Vendor registered successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error during vendor registration' });
//   }
// });

// // Vendor Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const vendor = await Vendor.findOne({ email });
//     if (!vendor)
//       return res.status(400).json({ message: 'Vendor not found' });

//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch)
//       return res.status(400).json({ message: 'Invalid credentials' });

//     res.status(200).json({ message: 'Vendor login successful', vendor });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error during vendor login' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { registerVendor, loginVendor } = require('../controllers/vendorController');

router.post('/register', registerVendor);
router.post('/login', loginVendor);

module.exports = router;
