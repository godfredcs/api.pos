const mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
    number: {
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

module.exports = mongoose.model('Credit', CreditSchema);
