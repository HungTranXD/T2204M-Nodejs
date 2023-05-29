const mongoose = require("mongoose");
const product = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    brand: String
});

module.exports = mongoose.model("Product", product);