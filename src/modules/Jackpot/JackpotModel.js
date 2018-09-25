const mongoose = require('mongoose');

const JackpotSchema = new mongoose.Schema({
    name: {
        type: String,
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

module.exports = mongoose.model('Jackpot', JackpotSchema);
