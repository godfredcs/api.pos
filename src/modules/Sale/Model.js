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
        }
    }, {
        timestamps: true
    });
}

/**
 * item_id foreign key will be appended to table to enable relationship between item and sale.
 */
