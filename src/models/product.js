const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
});

module.exports = mongoose.model("Product", productSchema);