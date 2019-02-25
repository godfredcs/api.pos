module.exports = function (sequelize, type) {
    return sequelize.define('user', {
        id: {
            primaryKey: true,
            type: type.INTEGER,
            autoIncrement: true
        },

        firstname: {
            type: type.STRING,
            allowNull: false
        },

        lastname: {
            type: type.STRING
        },

        email: {
            type: type.STRING,
            allowNull: false
        },

        password: {
            type: type.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });
}
