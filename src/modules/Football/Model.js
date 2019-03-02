module.exports = function (sequelize, type) {
    return sequelize.define('football', {
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

        number_of_people: {
            type: type.INTEGER,
            allowNull: false
        },

        unit_charge: {
            type: type.DECIMAL(10, 2),
            allowNull: false
        },

        amount: {
            type: type.DECIMAL(10, 2),
            allowNull: false
        }
    });
}
