const express = require('express');
const mongoose = require('mongoose');
const app = express(); // ✅ only call express once
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const QRCode = require('qrcode');

const userModel = require('./models/user');
const vendorModel = require('./models/vendor'); // ✅ corrected
const bookingModel = require('./models/Booking');
const venueModel = require('./models/venue'); // ✅ Make sure it's imported

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ✅ needed for JSON body parsing
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
            let vendor = await vendorModel.create({
                username,
                email,
                vendorID,
                password: hash
            });
            let token = jwt.sign({ email }, "shhh");
            res.cookie("token", token);
            res.send(vendor);
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
            res.send(`Welcome back, ${user.username}!`);
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
            res.send(`Welcome vendor ${vendor.username}!`);
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

    try {
        const venue = await venueModel.findById(venueId);
        if (!venue) return res.status(404).send("Venue not found");

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).send("User not found");

        const conflictingBookings = await bookingModel.find({
            venue: venueId,
            eventDate: new Date(eventDate),
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });

        if (conflictingBookings.length > 0) {
            return res.send("This venue is already booked at that time.");
        }

        const booking = new bookingModel({
            user: userId,
            username: user.username,
            venue: venueId,
            venueName: venue.name,
            eventDate,
            startTime,
            endTime,
            status: 'Confirmed'
        });

        const qrText = `Booking ID: ${booking._id}\nUser: ${user.username}\nVenue: ${venue.name}\nDate: ${new Date(eventDate).toDateString()}\nTime: ${startTime} to ${endTime}`;
        const qrImage = await QRCode.toDataURL(qrText);

        booking.qrCode = qrImage;

        await booking.save();

        res.send(`✅ Booking created successfully with QR: ${booking._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("❌ Something went wrong");
    }
});


// ✅ Vendor auth middleware
function verifyVendor(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not authenticated");

    try {
        const decoded = jwt.verify(token, "shhh");
        req.vendorEmail = decoded.email;
        next();
    } catch (err) {
        return res.status(403).send("Invalid token");
    }
}

// ✅ Get Vendor Dashboard Data
app.get('/vendorDashboardData', verifyVendor, async (req, res) => {
    try {
        const vendor = await vendorModel.findOne({ email: req.vendorEmail });
        const venues = await venueModel.find({ vendor: vendor._id });
        res.json({ vendor: vendor.username, venues });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading dashboard");
    }
});

// ✅ Add new venue
app.post('/addVenue', verifyVendor, async (req, res) => {
    const { name, location, capacity } = req.body;

    try {
        const vendor = await vendorModel.findOne({ email: req.vendorEmail });

        await venueModel.create({
            name,
            location,
            capacity,
            vendor: vendor._id
        });

        res.status(201).send("Venue added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding venue");
    }
});


app.listen(4001, () => {
    console.log("Server is running on http://localhost:4001");
});
