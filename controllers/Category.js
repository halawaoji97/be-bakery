const Category = require('../models/Category');

module.exports = {
  viewCategory: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      const category = await Category.find();

      res.render('admin/category/view_category', {
        category,
        alert,
        title: 'Bakery | Kategori',
      });
    } catch (err) {
      console.log(error);
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/category/create', {
        title: 'add category',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name } = req.body;

      let category = await Category({ name });
      await category.save();

      req.flash('alertMessage', 'Berhasil tambah kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findOne({ _id: id });
      res.render('admin/category/edit', {
        category,
        title: 'edit category',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Category.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      req.flash('alertMessage', 'Berhasil Edit kategori');
      req.flash('alertStatus', 'success');

      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findOneAndRemove({
        _id: id,
      });

      req.flash('alertMessage', 'Berhasil Delete kategori');
      req.flash('alertStatus', 'success');
      res.redirect('/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  },
};
