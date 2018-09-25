const mongoose = require('mongoose');

const FootballSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    number_of_people: {
        type: Number,
        required: true,
        trim: true
    },

    unit_charge: {
        type: mongoose.Schema.Types.Decimal128,
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

module.exports = mongoose.model('Football', FootballSchema);
