const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    rollno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});
module.exports = User = mongoose.model("users", UserSchema);