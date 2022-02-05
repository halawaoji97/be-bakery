const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {
  viewOrder: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const order = await Order.find();
      console.log(order);

      res.render('admin/order/view_order', {
        order,
        alert,
        title: 'Bakery | Order',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/order');
    }
  },

  createOrder: async (req, res) => {
    const order = req.body;

    const newOrder = new Order({
      ...order,
    });

    try {
      await newOrder.save();

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  //   viewCreate: async (req, res) => {
  //     try {
  //       const category = await Category.find();
  //       res.render('admin/product/create', {
  //         title: 'add product',
  //         category,
  //       });
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/category');
  //     }
  //   },

  //   createProduct: async (req, res) => {
  //     try {
  //       const { categoryId, name, price, description, size, weight } = req.body;
  //       if (req.file) {
  //         const category = await Category.findOne({ _id: categoryId });

  //         const newProduct = {
  //           categoryId: category._id,
  //           name,
  //           price,
  //           description,
  //           size,
  //           weight,
  //           imageUrl: `images/${req.file.filename}`,
  //         };
  //         console.log(newProduct);

  //         const product = await Product.create(newProduct);

  //         category.productId.push({ _id: product._id });

  //         await category.save();
  //         await product.save();
  //       }

  //       req.flash('alertMessage', 'Added product successfully');
  //       req.flash('alertStatus', 'success');

  //       res.redirect('/product');
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/product');
  //     }
  //   },

  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const product = await Product.findOne({ _id: id }).populate({
  //         path: 'categoryId',
  //         select: 'id name',
  //       });
  //       const category = await Category.find();
  //       res.render('admin/product/edit', {
  //         product,
  //         category,
  //         title: 'edit product',
  //       });
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/product');
  //     }
  //   },

  //   editProduct: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { categoryId, name, price, description, size, weight } = req.body;
  //       const product = await Product.findOne({ _id: id }).populate({
  //         path: 'categoryId',
  //         select: 'id name',
  //       });

  //       if (req.file == undefined) {
  //         product.name = name;
  //         product.price = price;
  //         product.size = size;
  //         product.description = description;
  //         product.weight = weight;
  //         product.categoryId = categoryId;
  //         await product.save();

  //         req.flash('alertMessage', 'Updated product successfully');
  //         req.flash('alertStatus', 'success');
  //         res.redirect('/product');
  //       } else {
  //         product.name = name;
  //         product.price = price;
  //         product.size = size;
  //         product.description = description;
  //         product.weight = weight;
  //         product.categoryId = categoryId;
  //         product.imageUrl = `images/${req.file.filename}`;
  //         await product.save();

  //         req.flash('alertMessage', 'Updated product successfully');
  //         req.flash('alertStatus', 'success');
  //         res.redirect('/product');
  //       }
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/product');
  //     }
  //   },

  //   deleteProduct: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       await Product.findOneAndRemove({
  //         _id: id,
  //       });

  //       req.flash('alertMessage', 'Deleted product successfully');
  //       req.flash('alertStatus', 'success');
  //       res.redirect('/product');
  //     } catch (err) {
  //       req.flash('alertMessage', `${err.message}`);
  //       req.flash('alertStatus', 'danger');
  //       res.redirect('/product');
  //     }
  //   },
};
