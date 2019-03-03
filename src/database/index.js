require('dotenv-safe').config();
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    ADMIN_EMAIL,
    DB_CONNECTION,
    ADMIN_LASTNAME,
    ADMIN_PASSWORD,
    ADMIN_FIRSTNAME
} = process.env;

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

User.belongsTo(Role);
Sale.belongsTo(Item);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database: ', error));

sequelize.sync()
    .then(function () {
        Role.count()
            .then(function (count) {
                if (Number(count)) {
                    return;
                }

                Role.bulkCreate([
                    { name: 'admin' },
                    { name: 'user' }
                ])
                    .then(function () {
                        Role.findOne({ name: 'admin '})
                            .then(function (role) {
                                const role_id = role.get('id');
                                const salt_rounds = 10;

                                bcrypt.hash(ADMIN_PASSWORD, salt_rounds, function (err, hash) {
                                    if (err) {
                                        return console.log('could not hash default password');
                                    }

                                    if (hash) {
                                        User.create({
                                            role_id,
                                            firstname: ADMIN_FIRSTNAME,
                                            lastname: ADMIN_LASTNAME,
                                            email: ADMIN_EMAIL,
                                            password: hash
                                        });
                                    }
                                })
                            });
                    });
            })
    })
    .catch(error => console.error('Could not create tables: ', error));

/** Export the models and Op operator */
module.exports = {
    Role,
    User,
    Item,
    Sale,
    Jackpot,
    Football,
    CreditCard,
    MobileMoney,
    CreditTransfer,
    Op: Sequelize.Op
};
