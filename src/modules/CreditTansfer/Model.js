module.exports = function (sequelize, type) {
    return sequelize.define('credit_transfer', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        phone: {
            type: type.STRING,
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
