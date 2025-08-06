// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel');

// // Register User
// router.post('/register', async (req, res) => {
//   const { name, username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       username,
//       email,
//       password: hashedPassword
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error during user registration' });
//   }
// });

// // User Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: 'Invalid credentials' });

//     res.status(200).json({ message: 'User login successful', user });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error during user login' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/userController');

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });
//   if (user) {
//     res.json({ success: true, name: user.name });
//   } else {
//     res.status(401).json({ success: false, message: "Invalid customer credentials" });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Bookeasy_User = require('../models/User'); // adjust path if needed

// // Login Customer
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await Bookeasy_User.findOne({ email, password });
//   if (user) {
//     res.json({ success: true, name: user.name });
//   } else {
//     res.status(401).json({ success: false, message: "Invalid customer credentials" });
//   }
// });

// module.exports = router;

// // Example for userRoutes.js
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login attempt:", email, password);

//   const user = await Bookeasy_User.findOne({ email });
//   if (!user) {
//     console.log("User not found");
//     return res.status(401).json({ success: false, message: "User not found" });
//   }

//   console.log("User found:", user);
//   if (user.password !== password) {
//     console.log("Password mismatch");
//     return res.status(401).json({ success: false, message: "Incorrect password" });
//   }

//   res.json({ success: true, name: user.name });
// });


// const express = require('express');
// const router = express.Router();
// const Bookeasy_User = require('../models/Bookeasy_User');

// // Customer login route
// router.post('/login-customer', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await Bookeasy_User.findOne({ email, password });
//     if (user) {
//       res.json({ success: true, name: user.name });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid customer credentials" });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/userController');

// router.post('/register', registerUser);
// router.post('/login-customer', loginUser);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
