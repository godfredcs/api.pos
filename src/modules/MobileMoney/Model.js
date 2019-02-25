module.exports = function (sequelize, type) {
    return sequelize.define('sale', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: type.INTEGER,
            autoIncrement: true
        },

        name: {
            type: type.INTEGER,
            allowNull: false
        },

        type: {
            type: type.INTEGER,
            enum: ['cash-in', 'cash-out'],
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

