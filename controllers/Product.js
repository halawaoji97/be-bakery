const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {
  viewProduct: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const product = await Product.find();

      res.render('admin/product/view_product', {
        product,
        alert,
        title: 'Bakery | Product',
      });
    } catch (err) {
      console.log(error);
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/product');
    }
  },
  // viewCreate: async (req, res) => {
  //   try {
  //     res.render('admin/category/create', {
  //       title: 'add category',
  //     });
  //   } catch (err) {
  //     req.flash('alertMessage', `${err.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/category');
  //   }
  // },

  // createCategory: async (req, res) => {
  //   try {
  //     const { name } = req.body;

  //     let category = await Category({ name });
  //     await category.save();

  //     req.flash('alertMessage', 'Berhasil tambah kategori');
  //     req.flash('alertStatus', 'success');

  //     res.redirect('/category');
  //   } catch (err) {
  //     req.flash('alertMessage', `${err.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/category');
  //   }
  // },

  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const category = await Category.findOne({ _id: id });
  //     res.render('admin/category/edit', {
  //       category,
  //       title: 'edit category',
  //     });
  //   } catch (err) {
  //     req.flash('alertMessage', `${err.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/category');
  //   }
  // },

  // editCategory: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name } = req.body;

  //     await Category.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       { name }
  //     );

  //     req.flash('alertMessage', 'Berhasil Edit kategori');
  //     req.flash('alertStatus', 'success');

  //     res.redirect('/category');
  //   } catch (err) {
  //     req.flash('alertMessage', `${err.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/category');
  //   }
  // },

  // deleteCategory: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     await Category.findOneAndRemove({
  //       _id: id,
  //     });

  //     req.flash('alertMessage', 'Berhasil Delete kategori');
  //     req.flash('alertStatus', 'success');
  //     res.redirect('/category');
  //   } catch (err) {
  //     req.flash('alertMessage', `${err.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/category');
  //   }
  // },
};
