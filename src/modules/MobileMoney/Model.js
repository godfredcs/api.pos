module.exports = function (sequelize, type) {
    return sequelize.define('mobile_money', {
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

        type: {
            type: type.ENUM('cash-in', 'cash-out'),
            allowNull: false
        },

        phone: {
            type: type.DECIMAL(10, 2),
            allowNull: false
        },

        commission: {
            type: type.DECIMAL(10, 2),
            allowNull: true
        },

        amount: {
            type: type.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: true
    });
}

