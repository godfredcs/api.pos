require('dotenv-safe').config();
const Sequelize = require('sequelize');
const { DB_HOST, DB_CONNECTION, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_CONNECTION,
    operatorsAliases: false,
    define: {
        timestamps: true,
        underscored: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

/** Import Models */
const Role = require('../modules/Role/Model')(sequelize, Sequelize);
const User = require('../modules/User/Model')(sequelize, Sequelize);
const Item = require('../modules/Item/Model')(sequelize, Sequelize);
const Sale = require('../modules/Sale/Model')(sequelize, Sequelize);
const Jackpot = require('../modules/Jackpot/Model')(sequelize, Sequelize);
const Football = require('../modules/Football/Model')(sequelize, Sequelize);
const CreditCard = require('../modules/CreditCard/Model')(sequelize, Sequelize);
const MobileMoney = require('../modules/MobileMoney/Model')(sequelize, Sequelize);
const CreditTransfer = require('../modules/CreditTansfer/Model')(sequelize, Sequelize);

Sale.belongsTo(Item);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database: ', error));

sequelize.sync({ force: true })
    .then(function () {
        Role.bulkCreate([
            { name: 'admin' },
            { name: 'user' }
        ])
            .then(function () {
                User.create({
                    firstname: 'Godfred',
                    lastname: 'Boateng',
                    email: 'godfred@gmail.com',
                    password: 'godfred'
                })
            });
    })
    .catch(error => console.error('Could not create tables: ', error));

/** Export the models */
module.exports = {
    Role,
    User,
    Item,
    Sale,
    Jackpot,
    Football,
    CreditCard,
    MobileMoney,
    CreditTransfer
};
