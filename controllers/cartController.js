const Cart = require('../models/Cart');
const Shoe = require('../models/Shoe');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
  const { shoeId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shoeId)) {
    return res.status(400).json({ message: 'ID giày không hợp lệ' });
  }

  try {
    const shoe = await Shoe.findById(shoeId);
    if (!shoe) {
      return res.status(404).json({ message: 'Giày không tồn tại' });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [], total: 0 });
    }

    const existingItem = cart.items.find(item => item.shoe.equals(shoe._id));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ shoe: shoe._id, quantity });
    }

    cart.total = cart.items.reduce((acc, item) => acc + item.quantity * shoe.price, 0);

    await cart.save();
    res.status(200).json({ message: 'Đã thêm vào giỏ hàng', cart });
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error: err });
  }
};

const updateCartItem = async (req, res) => {
  const { shoeId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(shoeId)) {
    return res.status(400).json({ message: 'ID giày không hợp lệ' });
  }

  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    const item = cart.items.find(item => item.shoe.equals(shoeId));
    if (!item) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
    }

    item.quantity = quantity;

    let total = 0;
    for (let item of cart.items) {
      const shoe = await Shoe.findById(item.shoe);
      if (shoe) {
        total += item.quantity * shoe.price;
      }
    }

    cart.total = total; 

    await cart.save();
    res.status(200).json({ message: 'Đã cập nhật giỏ hàng', cart });
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error: err });
  }
};


const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' });
    }

    await Cart.deleteOne();
    res.status(200).json({ message: 'Thanh toán thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi xảy ra khi thanh toán', error: err });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  checkout
};
