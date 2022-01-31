var express = require('express');
var router = express.Router();
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
const {
  viewProduct,
  viewCreate,
  createProduct,
  viewEdit,
  editProduct,
  deleteProduct,
} = require('../controllers/Product');

router.get('/', viewProduct);
router.get('/create', viewCreate);
router.post('/create', uploadSingle, createProduct);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
