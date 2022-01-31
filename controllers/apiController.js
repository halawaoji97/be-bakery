const Product = require('../models/Product');
const Category = require('../models/Category');

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
};
