const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');

module.exports = {
  landingPage: async (req, res) => {
    try {
      const specialProduct = await Product.find()
        .select('_id name price categoryId imageUrl')
        .limit(5)
        .populate({ path: 'categoryId', select: '_id name' });
      res.status(200).json({ specialProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id }).populate({
        path: 'categoryId',
        select: '_id name',
      });

      res.status(200).json({
        ...product._doc,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  orderPage: async (req, res) => {
    const {
      // idProduct,
      orderOn,
      deliveryOn,
      fullName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
      cartItems,
    } = req.body;

    if (
      // idProduct === undefined ||
      orderOn === undefined ||
      deliveryOn === undefined ||
      fullName === undefined ||
      email === undefined ||
      phoneNumber === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined ||
      cartItems == undefined
    ) {
      return res.status(404).json({ message: 'Lengkapi semua field' });
    }

    // const product = await Product.findOne({ _id: idProduct });

    // if (!product) {
    //   return res.status(404).json({ message: 'Item not found' });
    // }

    // await product.save();

    let totalAmount = '20';

    const invoice = Math.floor(1000000 + Math.random() * 9000000);

    const newOrder = {
      invoice,
      orderOn,
      deliveryOn,
      totalAmount,
      cartItems,
      payments: {
        bankFrom: bankFrom,
        accountHolder: accountHolder,
      },
    };
    const order = await Order.create(newOrder);
    console.log(order);

    return res.status(200).json({ message: 'Success Booking', order });
  },
};
