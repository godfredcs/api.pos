module.exports = function (sequelize, type) {
    return sequelize.define('credit_card_type', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        name: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });
}
