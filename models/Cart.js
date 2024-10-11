const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  shoe: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  total: { type: Number, required: true, default: 0 }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
