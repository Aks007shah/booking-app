const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const stripe = require("stripe")(
  "sk_test_51PN9N100uc8vEUEWyGj7SMn8sguhtT8jCRUkXCuhvpH5lbcBlVBXc2Am79SAFGf2OiexYndSGkCQede3xqMAeUxX00awd9xTgp"
);
const { v4: uuidv4 } = require("uuid");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  // Stripe payment integration
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "INR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      if (
        !room ||
        !userid ||
        !fromdate ||
        !todate ||
        !totalamount ||
        !totaldays
      ) {
        console.error("Missing required fields:", {
          room,
          userid,
          fromdate,
          todate,
          totalamount,
          totaldays,
        });
        return res.status(400).send("All fields are required");
      }

      try {
        console.log("Booking Request:", req.body);

        const newBooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate,
          todate,
          totaldays,
          totalamount,
          transactionid: payment.id, // Use the Stripe payment ID
        });

        await newBooking.save();

        // saving selected room's data
        const roomtemp = await Room.findOne({ _id: room._id });

        roomtemp.currentbookings.push({
          bookingid: newBooking._id,
          fromdate: fromdate,
          todate: todate,
          userid: userid,
          status: newBooking.status,
        });

        await roomtemp.save();

        res.status(200).send("Room Booked Successfully");
      } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(400).send("Payment failed");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(400).json(error);
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const booking = await Booking.findOne({ _id: bookingid });

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    booking.status = "cancelled";
    await booking.save();

    const room = await Room.findOne({ _id: roomid });

    if (!room) {
      return res.status(404).send("Room not found");
    }

    const updatedBookings = room.currentbookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    room.currentbookings = updatedBookings;

    await room.save();

    res.status(200).send("Booking Cancelled Successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
});

router.get("/getalldetails", async (req, res) => {
  try {
    const data = await Booking.find({});

    res.send(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
