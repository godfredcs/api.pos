module.exports = function (sequelize, type) {
    return sequelize.define('jackpot', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: type.INTEGER,
            autoIncrement: true
        },

        name: {
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

