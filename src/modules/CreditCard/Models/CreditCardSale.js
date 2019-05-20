module.exports = function (sequelize, type) {
    return sequelize.define('credit_card_sale', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        card_id: {
            type: type.INTEGER,
            allowNull: false
        },

        quantity: {
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
