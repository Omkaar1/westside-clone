const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb+srv://unit4P:unit4P@cluster0.f6rot.mongodb.net/unit4PDatabase?retryWrites=true&w=majority");
}