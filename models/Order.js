const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const id = Math.floor(1000000 + Math.random() * 9000000);
const orderSchema = new mongoose.Schema(
  {
    orderOn: {
      type: Date,
      required: true,
    },
    deliveryOn: {
      type: Date,
      required: true,
    },
    invoice: {
      type: String,
      required: true,
    },
    cartItems: [
      {
        _id: String,
        name: String,
        price: Number,
      },
    ],
    payments: {
      // proofPayment: {
      //   type: String,
      //   required: true,
      // },
      bankFrom: {
        type: String,
        required: true,
      },
      accountHolder: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: 'Proses',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
