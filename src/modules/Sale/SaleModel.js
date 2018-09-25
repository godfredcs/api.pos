const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
        trim: true
    },

    unit_quantity: {
        type: Number,
        required: true,
        trim: true
    },

    whole_quantity: {
        type: Number,
        required: true,
        trim: true
    },

    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sale', SaleSchema);
