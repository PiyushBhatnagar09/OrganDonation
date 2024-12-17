const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/dbconnect');
// const db1 = require('./config/hospitals-seeder');

const port = 8000;
var cors = require("cors");
var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static(__dirname+'/uploads'));

const donorsRouter = require('./routes/api/donors');
const hospitalsRouter = require('./routes/api/hospitals');
const moneydonorRouter= require('./routes/api/moneydonor');
const recipientsRouter= require('./routes/api/recipients');
const transplantsRouter= require('./routes/api/transplants');

app.use('/api/donors', donorsRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/moneydonor', moneydonorRouter);
app.use('/api/recipients', recipientsRouter);
app.use('/api/transplants', transplantsRouter);

app.get("/", function (req, res) {
    res.send("This is home page");
})

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})