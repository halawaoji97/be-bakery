const Product = require('../models/Product')
const Category = require('../models/Category')
const Order = require('../models/Order')
const Member = require('../models/Member')

module.exports = {
  landingPage: async (req, res) => {
    try {
      const specialProduct = await Product.find()
        .select('_id name price categoryId imageUrl')
        .limit(5)
        .populate({ path: 'categoryId', select: '_id name' })
      res.status(200).json({ specialProduct })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params
      const product = await Product.findOne({ _id: id }).populate({
        path: 'categoryId',
        select: '_id name'
      })

      res.status(200).json({
        ...product._doc
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })
    }
  },

  orderPage: async (req, res) => {
    const {
      email,
      fullName,
      orderOn,
      deliveryOn,
      addressNote,
      cartItems,
      cartTotalQty,
      cartTotalAmount,
      phoneNumber,
      street,
      city,
      country,
      zipCode
    } = req.body

    if (
      orderOn === undefined ||
      deliveryOn === undefined ||
      fullName === undefined ||
      email === undefined ||
      phoneNumber === undefined ||
      cartItems == undefined ||
      cartTotalQty === undefined ||
      cartTotalAmount === undefined ||
      street === undefined ||
      city === undefined ||
      country === undefined ||
      zipCode === undefined ||
      addressNote === undefined
    ) {
      return res.status(404).json({ message: 'Lengkapi semua field' })
    }

    const member = await Member.create({
      email,
      fullName,
      phoneNumber,
      addressNote,
      street,
      city,
      country,
      zipCode
    })

    const newOrder = {
      fullName,
      orderOn,
      deliveryOn,
      cartItems,
      cartTotalQty,
      cartTotalAmount,
      memberId: member._id
    }
    const order = await Order.create(newOrder)
    return res.status(200).json({ message: 'Success Booking', order })
  }
}
