//connecting to database using mongoose
const mongoose= require('mongoose');

mongoose.connect(`mongodb+srv://pbpiyush34:piyushbhat@cluster0.sreyp4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
// mongoose.connect(`mongodb://localhost:27017/OrganDonation`);

//making connection with database
const db= mongoose.connection;

//checking connection
db.on('error', console.error.bind(console, 'Error connecting to mongoDb'));

db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports= db;