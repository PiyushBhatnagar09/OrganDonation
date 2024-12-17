//connecting to database using mongoose
const mongoose= require('mongoose');
require('dotenv').config();  // This must be at the very top

mongoose.connect(process.env.DATABASE_URL);
// mongoose.connect(`mongodb://localhost:27017/OrganDonation`);

//making connection with database
const db= mongoose.connection;

//checking connection
db.on('error', console.error.bind(console, 'Error connecting to mongoDb'));

db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports= db;