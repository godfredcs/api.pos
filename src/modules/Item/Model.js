module.exports = function (sequelize, type) {
    return sequelize.define('item', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        name: {
            type: type.STRING
        },

        whole_price: {
            type: type.STRING,
            allowNull: false
        },

        unit_price: {
            type: type.STRING,
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
