const express = require('express');
const mongoose = require('mongoose');
const app = express(); // ✅ only call express once
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const userModel = require('./models/user');
const vendorModel = require('./models/vendor'); // ✅ corrected
const bookingModel=require('./models/Booking');

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ MongoDB connection
mongoose.connect('mongodb+srv://s51741248:h2ZNgA7GILexRGbN@cluster0.82ebe.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log(err));

app.get('/', function (req, res) {
    res.send("Welcome!");
});

// ✅ Changed GET to POST (create should be POST)
app.post('/createUser', (req, res) => {
    let { username, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                password: hash
            });
            let token = jwt.sign({ email }, "shhh");
            res.cookie("token", token);
            res.send(user);
        });
    });
});

app.post('/createVendor', (req, res) => {
    let { username, email, password, vendorID } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let vendor = await vendorModel.create({  // ✅ correct model
                username,
                email,
                vendorID,
                password: hash
            });
            let token = jwt.sign({ email }, "shhh");
            res.cookie("token", token);
            res.send(vendor); // ✅ fixed: was sending `user` by mistake
        });
    });
});

// USER login
app.get('/loginUser', function (req, res) {
    res.render('login');
});

app.post('/loginUser', async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("User not found!");

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, "shhh");
            res.cookie("token", token);
            res.send(`Welcome back, ${user.username}!`); // ✅ fixed template string
        } else {
            res.send("Invalid credentials");
        }
    });
});

// VENDOR login
app.get('/loginVendor', function (req, res) {
    res.render('login');
});

app.post('/loginVendor', async function (req, res) {
    let vendor = await vendorModel.findOne({ email: req.body.email });
    if (!vendor) return res.send("Vendor not found!");

    bcrypt.compare(req.body.password, vendor.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: vendor.email }, "shhh");
            res.cookie("token", token);
            res.send(`Welcome vendor ${vendor.username}!`); // ✅ fixed
        } else {
            res.send("Invalid credentials");
        }
    });
});

// Logout
app.get('/logoutUser', function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
});

app.get('/logoutVendor', function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
});


// EVENT BOOKING
app.post('/bookVenue', async (req, res) => {
    const { userId, venueId, eventDate, startTime, endTime } = req.body;
  
    // Check for conflicts
    const conflictingBookings = await Booking.find({
      venue: venueId,
      eventDate: new Date(eventDate),
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });
  
    if (conflictingBookings.length > 0) {
      return res.send("This venue is already booked at that time.");
    }
  
    // Create booking
    const booking = await Booking.create({
      user: userId,
      venue: venueId,
      eventDate,
      startTime,
      endTime,
      status: 'Pending'
    });
  
    res.send(`Booking created successfully: ${booking._id}`);
  });
  

app.listen(4001, () => {
    console.log("Server is running on http://localhost:4001");
});
