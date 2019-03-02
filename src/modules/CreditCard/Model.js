module.exports = function (sequelize, type) {
    return sequelize.define('credit_card', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        type: {
            type: type.ENUM('mtn', 'vodafone', 'airteltigo'),
            allowNull: false
        },

        price: {
            type: type.DECIMAL(10, 2),
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
