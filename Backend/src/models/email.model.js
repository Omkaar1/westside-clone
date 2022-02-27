const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email: {type: String, required: true},
    otp: {type: Number, required: true}
});

module.exports = mongoose.model("email",emailSchema);