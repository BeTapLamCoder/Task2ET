const mongoose = require("mongoose");
const Shoe = require("../models/Shoe");
const Order = require("../models/Order");

const purchaseShoe = async (req, res) => {
    const { shoeID, quantity, customerName } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(shoeID)) {
            return res.status(400).json({ message: "ID giày không hợp lệ" });
        }

        const shoe = await Shoe.findById(shoeID);
        if (!shoe) {
            return res.status(404).json({ message: "Giày không tồn tại" });
        }

        const totalPrice = shoe.price * quantity;
        const order = new Order({
            shoe: shoe._id,
            quantity: quantity,
            totalPrice: totalPrice,
            customerName: customerName
        });

        await order.save();
        res.status(201).json({ message: "Mua giày thành công", order });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Đã có lỗi" });
    }
};

const getAllShoes = async (req, res) => {
    try {
        const shoes = await Shoe.find(); 
        res.status(200).json(shoes);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm.' });
    }
};


module.exports = {
    getAllShoes,
    purchaseShoe
};
