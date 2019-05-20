module.exports = function (sequelize, type) {
    return sequelize.define('momo_start_of_day', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: type.INTEGER,
            autoIncrement: true
        },

        electronic_cash: {
            type: type.DECIMAL(10, 2),
            allowNull: true
        },

        physical_cash: {
            type: type.DECIMAL(10, 2),
            allowNull: true
        },

        total_cash: {
            type: type.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: true
    });
}
