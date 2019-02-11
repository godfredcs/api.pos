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

module.exports = function (sequelize, type) {
    return sequelize.define('sale', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        unit_quantity: {
            type: type.INTEGER,
            allowNull: false
        },
        whole_quantity: {
            type: type.INTEGER,
            allowNull: false
        },
        amount: {
            type: type.DECIMAL(10, 2),
            allowNull: false
        },
        item_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: Item,
                key: 'id'
            }
        }
    }, {
        timestamps: true
    });
}
