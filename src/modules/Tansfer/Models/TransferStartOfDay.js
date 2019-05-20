module.exports = function (sequelize, type) {
    return sequelize.define('transfer_start_of_day', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        amount: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        }
    }, {
        timestamps: true
    });
}
