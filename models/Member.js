const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const memberSchema = new mongoose.Schema(
  {
    orderId: {
      type: ObjectId,
      ref: 'Order',
    },
    email: {
      type: String,
      required: [true, 'Email cannot be empty'],
    },
    fullName: {
      type: String,
      required: [true, 'FullName cannot be empty'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'PhoneNumber cannot be empty'],
    },
    addressNote: {
      type: String,
      required: [true, 'AddressNote cannot be empty'],
    },
    city: {
      type: String,
      required: [true, 'City cannot be empty'],
    },
    country: {
      type: String,
      required: [true, 'Country cannot be empty'],
    },
    zipCode: {
      type: Number,
      required: [true, 'ZipCode cannot be empty'],
    },
    //   status: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Member', memberSchema);
