const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart/add', cartController.addToCart);

router.post('/cart/update', cartController.updateCartItem);

router.post('/cart/checkout', cartController.checkout);

module.exports = router;
