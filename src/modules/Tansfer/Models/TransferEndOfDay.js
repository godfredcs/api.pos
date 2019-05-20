module.exports = function (sequelize, type) {
    return sequelize.define('transfer_end_of_day', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        transfer_start_of_day_id: {
            allowNull: false,
            type: type.INTEGER
        },

        amount: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        },

        profit: {
            allowNull: false,
            type: type.DECIMAL(10, 2)
        }
    }, {
        timestamps: true
    });
}
