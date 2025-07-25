const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorAuthRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', userRoutes);         // for users
app.use('/api/vendor-auth', vendorRoutes); // for vendors

mongoose.connect('mongodb://localhost:27017/yourDBName')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
