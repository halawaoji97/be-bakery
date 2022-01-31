var express = require('express');
var router = express.Router();
const { viewProduct } = require('../controllers/Product');

router.get('/', viewProduct);
// router.get('/create', viewCreate);
// router.post('/create', createCategory);
// router.get('/edit/:id', viewEdit);
// router.put('/edit/:id', editCategory);
// router.delete('/delete/:id', deleteCategory);

module.exports = router;
