const router = require('express').Router();
const apiController = require('../controllers/apiController');
// const { uploadSingle } = require('../middlewares/multer');

router.get('/landing-page', apiController.landingPage);
router.get('/detail-page/:id', apiController.detailPage);
router.post('/order-page', apiController.orderPage);
router.get('/order-page', apiController.orderPage);
module.exports = router;
