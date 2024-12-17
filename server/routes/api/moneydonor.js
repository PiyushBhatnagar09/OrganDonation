const router = require('express').Router();
const Razorpay = require("razorpay");
const crypto= require('crypto');
const moneyDonor = require('../../models/moneydonor.model');

async function saveDonorNameToDatabase(donorName) {
  try {
    const donor = new moneyDonor({ name: donorName });
    await donor.save();
  } catch (error) {
    console.error("Error saving donor name to database:", error);
    throw error;
  }
}

router.get('/list', async (req, res) => {
    try {
      const donors = await moneyDonor.find({}, 'name'); // Retrieve all donor names from the database
      res.json({ donors: donors.map(donor => donor.name) });
    } catch (error) {
      console.error("Error fetching donor names:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.route('/order').post(async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: 'rzp_test_o8r3UGNOwqJGNM',
      key_secret: 'oB7STdUN1yFzxFwb1nTKd7dT',
    });

    const { donorName, ...options } = req.body; // Parse donorName from request body
    // Save donor's name to the database
    await saveDonorNameToDatabase(donorName); // Implement this function

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

router.route('/order/validate').post(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", 'oB7STdUN1yFzxFwb1nTKd7dT');
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = router;
