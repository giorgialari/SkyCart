const express = require('express');
const router = express.Router();
const allowedMethods = require('../middlewares/allowMethod');
const productsController = require('../controllers/products');

router.get('/products',  allowedMethods(['GET']), productsController.getAllProducts);
router.get('/products/filter',  allowedMethods(['GET']), productsController.filterProducts);
router.get('/cart/:user_id',  allowedMethods(['GET']), productsController.getCart);
router.post('/insertCart',  allowedMethods(['POST']), productsController.insertCart);
router.put('/updateCart', allowedMethods(['PUT']), productsController.updateCart);
router.delete('/deleteCart/:id', allowedMethods(['DELETE']), productsController.deleteCart);

module.exports = router;
