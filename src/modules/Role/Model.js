module.exports = function (sequelize, type) {
    return sequelize.define('role', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        name: {
            type: type.ENUM('admin', 'user'),
            allowNull: false
        }
    }, {
        timestamps: true
    });
}
