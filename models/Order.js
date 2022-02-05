const mongoose = require('mongoose');
const shortid = require('shortid');
const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      default: shortid.generate,
    },
    fullName: {
      type: String,
      required: true,
    },
    orderOn: {
      type: Date,
      default: new Date(),
    },
    deliveryOn: {
      type: String,
      default: new Date(),
    },
    cartItems: [
      {
        _id: String,
        title: String,
        price: Number,
        cartQty: Number,
      },
    ],
    memberId: {
      type: ObjectId,
      ref: 'Member',
    },
    cartTotalQty: Number,
    cartTotalAmount: Number,
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
