const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/dbconnect');
// const db1 = require('./config/hospitals-seeder');
const Razorpay = require("razorpay");
const crypto= require('crypto');

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
app.use('/api/donors', donorsRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/moneydonor', moneydonorRouter);


// app.post("/order", async (req, res) => {
//     try {
//       const razorpay = new Razorpay({
//         key_id: 'rzp_test_o8r3UGNOwqJGNM',
//         key_secret: 'oB7STdUN1yFzxFwb1nTKd7dT',
//       });
  
//       const { donorName, ...options } = req.body; // Parse donorName from request body
//       // Save donor's name to the database
//       await saveDonorNameToDatabase(donorName); // Implement this function

//       const order = await razorpay.orders.create(options);
  
//       if (!order) {
//         return res.status(500).send("Error");
//       }
  
//       res.json(order);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Error");
//     }
//   });
  
  // app.post("/order/validate", async (req, res) => {
  //   // console.log('here1')
  //   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //     req.body;
  
  //   const sha = crypto.createHmac("sha256", 'oB7STdUN1yFzxFwb1nTKd7dT');
  //   //order_id + "|" + razorpay_payment_id
  //   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  //   const digest = sha.digest("hex");
  //   if (digest !== razorpay_signature) {
  //     return res.status(400).json({ msg: "Transaction is not legit!" });
  //   }
  
  //   res.json({
  //     msg: "success",
  //     orderId: razorpay_order_id,
  //     paymentId: razorpay_payment_id,
  //   });
  // });


app.get("/", function (req, res) {
    res.send("This is home page");
})

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
})