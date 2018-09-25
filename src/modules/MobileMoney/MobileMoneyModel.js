// Load required modules
const mongoose = require('mongoose');

const MobileMoneySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
        enum: ['cash-in', 'cash-out'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    commission: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        trim: true
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MobileMoney', MobileMoneySchema);
