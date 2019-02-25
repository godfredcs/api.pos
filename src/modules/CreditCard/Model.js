module.exports = function (sequelize, type) {
    return sequelize.define('credit_card', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        type: {
            type: type.STRING,
            allowNull: false,
            enum: ['mtn', 'vodafone', 'airteltigo']
        },

        price: {
            type: type.STRING,
            allowNull: false
        },

        quantity: {
            type: type.DECIMAL(10, 2),
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
