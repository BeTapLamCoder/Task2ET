const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shoe: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    customerName: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Order', orderSchema);