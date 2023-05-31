const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema({
    name: String,
    slug: String,
    icon: String,
});

module.exports = mongoose.model("Brands", brandSchema);