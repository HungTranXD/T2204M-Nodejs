const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [6, "Ten phai co do dai thoi thieu la 6"],
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        minLength: [6, "Email phai co do dai toi thieu la 6"],
        maxLength: 100,
        unique: true,
        validate: {
            validator: (v) => {
                const emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return v.match(emailPattern);
            },
            message: (t) => `${t.value} khong phai la email`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255,
    }
});

module.exports = mongoose.model("User", userSchema);