const Item = require('../Item/Model');

module.exports = function (sequelize, type) {
    return sequelize.define('sale', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: type.INTEGER,
            autoIncrement: true
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
