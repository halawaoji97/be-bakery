var express = require('express');
var router = express.Router();
// const { uploadSingle, uploadMultiple } = require('../middlewares/multer');
const { viewOrder, createOrder } = require('../controllers/Order');

router.get('/', viewOrder);
router.post('/create', createOrder);
// router.post('/create', uploadSingle, createProduct);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', editProduct);
// router.delete('/delete/:id', deleteProduct);

module.exports = router;
