const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Nama kategori harus diiisi'],
    },
    productId: [
      {
        type: ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
