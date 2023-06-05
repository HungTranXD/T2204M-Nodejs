const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: String,
    phone: String,
    address: String,
    paymentAmount: Number,
    paymentMethod: String,
    note: String,
    products: [{
        productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        },
        quantity: Number,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Order", orderSchema);