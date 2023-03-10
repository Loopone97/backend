const Booking = require("../model/BookingSchema");



const createOrder = (req, res) => {

  Booking.create(
    {
      from: req.body?.from,
      to: req.body?.to,
      parcelType: req.body?.parcelType,
      parcelWeight: req.body?.parcelWeight,
      parcelWidth: req.body?.parcelWeight,
      parcelHeight: req.body?.parcelHeight,
      parcelLength: req.body?.parcelLength,
      parcelDescription: req.body?.parcelDescription,
      paymentMode: req.body?.paymentMode,
      parcelPaymentCollection: req.body?.parcelPaymentCollection,
      parcelImages: req.body?.parcelImages,
      billImages: req.body?.billImages,
      createdBy: req.body?.createdBy,
      otp: Math.floor(Math.random() * 999999) + 100000,
    },
    (err, Booking) => {
      if (err) {
        res.send(err);
      } else res.json(Booking);
    }
  );
};

const getOrder = (req, res) => {
  Booking.find().sort({ createdAt: -1 })
    .exec((err, BookingSchema) => {
      if (err) {
        res.send(err);
      }
      res.json(BookingSchema);
    });
};
const getAnOrder = (req, res) => {
  console.log(req.params);
  Booking.find({ _id: req.params.orderId })
    .sort({ createdAt: -1 })
    .exec((err, BookingSchema) => {
      if (err) {
        res.send(err);
      }
      res.json(BookingSchema);
    });
};
const findOrder = (req, res) => {
  Booking.find(req.body)
    .sort({ createdAt: -1 })
    .exec((err, BookingSchema) => {
      if (err) {
        res.send(err);
      }
      res.json(BookingSchema);
    });
};
const getOrderByUser = (req, res) => {
  // console.log(`{createdBy:${req.params.userID}}`)

  Booking.find({
    $or: [
      { from: req.params.userID },
      { to: req.params.userID },
      { createdBy: req.params.userID },
    ],
  })
    .sort({ createdAt: -1 })
    .exec((err, BookingSchema) => {
      if (err) {
        res.send(err);
      }
      res.json(BookingSchema);
    });
};

const updateOrder = (req, res) => {
  Booking.findOneAndUpdate(
    { _id: req.params.orderID },
    {
      $set: {
        from: req.body.from,
        to: req.body.to,
        parcelType: req.body.parcelType,
        parcelWeight: req.body.parcelWeight,
        parcelWidth: req.body.parcelWeight,
        parcelHeight: req.body.parcelHeight,
        parcelLength: req.body.parcelLength,
        parcelDescription: req.body.parcelDescription,
        paymentMode: req.body.paymentMode,
        parcelPaymentCollection: req.body.parcelPaymentCollection,
        parcelImages: req.body.parcelImages,
        billImages: req.body.billImages,
        createdBy: req.body.createdBy,
        otp: req.body.otp,
        status: req.body.status,
        agentName: req.body.agentName,
        agentId: req.body.agentId,
        pickupDate: req.body.pickupDate,
        deliveryDate: req.body.deliveryDate
      },
    },
    { new: true, setDefaultsOnInsert: true },
    (err, Booking) => {
      if (err) {
        res.send(err);
      } else res.json(Booking);
    }
  );
};

const deleteOrder = (req, res) => {
  Booking.deleteOne({ _id: req.params.orderID })
    .then(() => res.json({ message: "Order Deleted" }))
    .catch((err) => res.send(err));
};


module.exports = {
  getOrder,
  getAnOrder,
  getOrderByUser,
  findOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  
};
