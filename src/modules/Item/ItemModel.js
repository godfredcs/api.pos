const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    whole_price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        trim: true
    },

    unit_price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        trim: true
    },

    image: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', ItemSchema);
