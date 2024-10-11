const express = require('express');
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

router.get('/shoes', purchaseController.getAllShoes);

router.post('/buy', purchaseController.purchaseShoe);

module.exports = router;
