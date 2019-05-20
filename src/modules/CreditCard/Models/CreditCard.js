module.exports = function (sequelize, type) {
    return sequelize.define('credit_card', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        credit_card_type_id: {
            allowNull: false,
            type: type.INTEGER
        },

        name: {
            allowNull: false,
            type: type.STRING
        },

        unit_price: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        },

        quantity: {
            allowNull: false,
            type: type.INTEGER
        }
    }, {
        timestamps: true
    });
}
