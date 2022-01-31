var express = require('express');
var router = express.Router();
const {
  viewCategory,
  viewCreate,
  createCategory,
  editCategory,
  viewEdit,
  deleteCategory,
} = require('../controllers/Category');

router.get('/', viewCategory);
router.get('/create', viewCreate);
router.post('/create', createCategory);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
