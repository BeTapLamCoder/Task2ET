const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const purchaseRoutes = require('./routes/purchaseRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectToMongo();

app.use('/v1', purchaseRoutes);
app.use('/v1', cartRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
