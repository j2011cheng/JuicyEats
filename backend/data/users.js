const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "User"
    }],
    contact: [
        { type: String },
        { type: Number }
    ]
});

module.exports = mongoose.model('Users', userSchema);