const mongoose = require('mongoose');
const sequence = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Users'
        },
        listings: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Listings'
        }],
        quantities: [{
            type: Number,
            required: true
        }],
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

orderSchema.plugin(sequence, {
    inc_field: 'order',
    id: 'orderId'
});

module.exports = mongoose.model('Orders', orderSchema);