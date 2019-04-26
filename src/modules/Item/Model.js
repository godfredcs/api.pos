module.exports = function (sequelize, type) {
    return sequelize.define('item', {
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

        whole_price: {
            type: type.STRING,
            allowNull: false
        },

        unit_price: {
            type: type.STRING,
            allowNull: false
        },

        quantity: {
            type: type.INTEGER,
            allowNull: false
        },

        image: {
            type: type.STRING,
            allowNull: true
        }
    }, {
        timestamps: true
    });
}