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
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: Number,
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Users', userSchema);