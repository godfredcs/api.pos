module.exports = function (sequelize, type) {
    return sequelize.define('role', {
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
