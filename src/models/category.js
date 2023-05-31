const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    status: Boolean
});

module.exports = mongoose.model("Category", categorySchema);