const mongoose = require('mongoose');
const Venue = require('./models/venuemodel');

mongoose.connect('mongodb+srv://s51741248:h2ZNgA7GILexRGbN@cluster0.82ebe.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to DB");

  const venues = [
    { name: "Lal Qila Banquets And Hotel", location: "Patia, Bhubaneswar", capacity: 500 },
    { name: "Hotel Richi Regency", location: "Bapuji Nagar, Bhubaneswar", capacity: 400 },
    { name: "The Presidency", location: "Nayapalli, Bhubaneswar", capacity: 300 },
    { name: "Swosti Premium", location: "Jayadev Vihar, Bhubaneswar", capacity: 1000 },
    { name: "Galaxy Convention", location: "Palasuni, Bhubaneswar", capacity: 800 },
    { name: "Event Square", location: "Jayadev Vihar, Bhubaneswar", capacity: 800 },
    { name: "Kalinga Stadium", location: "Bidyut Marg, Bhubaneswar", capacity: 15000 },
    { name: "Hotel Venus Inn", location: "Bapuji Nagar, Bhubaneswar", capacity: 100 },
    { name: "Swosti Chilika Resort", location: "Chilika Lake, Bhubaneswar", capacity: 1000 },
    { name: "Pal Heights Mantra", location: "Pahala, Bhubaneswar", capacity: 500 }
  ];

  await Venue.insertMany(venues);
  console.log("Venues inserted successfully!");
  mongoose.disconnect();
}).catch(console.error);
