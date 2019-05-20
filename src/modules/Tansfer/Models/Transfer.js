module.exports = function (sequelize, type) {
    return sequelize.define('credit_transfer', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        amount: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        },

        charge: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        },

        total: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        }
    }, {
        timestamps: true
    });
}
