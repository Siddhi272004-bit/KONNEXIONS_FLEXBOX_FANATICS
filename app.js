const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const QRCode = require('qrcode');

const userModel = require('./models/user');
const vendorModel = require('./models/vendor');
const bookingModel = require('./models/Booking');
const venueModel = require('./models/venue');

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://s51741248:h2ZNgA7GILexRGbN@cluster0.82ebe.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Welcome!");
});

// ✅ Create user account
app.post('/createUser', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existing = await userModel.findOne({ email });
        if (existing) return res.status(400).send("Email already registered");

        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hash });

        const token = jwt.sign({ email }, "shhh");
        res.cookie("token", token);
        res.send(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// ✅ Create vendor account
app.post('/createVendor', async (req, res) => {
    try {
        const { username, email, password, vendorID } = req.body;
        const existing = await vendorModel.findOne({ email });
        if (existing) return res.status(400).send("Vendor email already registered");

        const hash = await bcrypt.hash(password, 10);
        const vendor = await vendorModel.create({ username, email, vendorID, password: hash });

        const token = jwt.sign({ email }, "shhh");
        res.cookie("token", token);
        res.send(vendor);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// ✅ User login
app.post('/loginUser', async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send("User not found!");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
        const token = jwt.sign({ email: user.email }, "shhh");
        res.cookie("token", token);
        res.send(`Welcome back, ${user.username}!`);
    } else {
        res.send("Invalid credentials");
    }
});

// ✅ Vendor login
app.post('/loginVendor', async (req, res) => {
    const vendor = await vendorModel.findOne({ email: req.body.email });
    if (!vendor) return res.send("Vendor not found!");

    const match = await bcrypt.compare(req.body.password, vendor.password);
    if (match) {
        const token = jwt.sign({ email: vendor.email }, "shhh");
        res.cookie("token", token);
        res.send(`Welcome vendor ${vendor.username}!`);
    } else {
        res.send("Invalid credentials");
    }
});

// ✅ Logout
app.get('/logoutUser', (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});
app.get('/logoutVendor', (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// ✅ Booking
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

// ✅ Vendor dashboard data
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

// ✅ Add venue route (example structure)
app.post('/addVenue', verifyVendor, async (req, res) => {
    const { name, location, capacity } = req.body;
    try {
        const vendor = await vendorModel.findOne({ email: req.vendorEmail });
        const venue = await venueModel.create({
            name,
            location,
            capacity,
            vendor: vendor._id
        });
        res.send(venue);
    } catch (err) {
        res.status(500).send("Could not add venue");
    }
});

app.listen(4001, () => {
    console.log("Server running on http://localhost:4001");
});
