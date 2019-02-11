module.exports = function (sequelize, type) {
    return sequelize.define('credit', {
        number: {
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
