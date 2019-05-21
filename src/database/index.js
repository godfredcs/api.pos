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

const CreditCard = require('../modules/CreditCard/Models/CreditCard')(sequelize, Sequelize);
const CreditCardType = require('../modules/CreditCard/Models/CreditCardType')(sequelize, Sequelize);
const CreditCardSale = require('../modules/CreditCard/Models/CreditCardSale')(sequelize, Sequelize);
const CreditCardPurchase = require('../modules/CreditCard/Models/CreditCardPurchase')(sequelize, Sequelize);

const MomoEndOfDay = require('../modules/Momo/Models/MomoEndOfDay')(sequelize, Sequelize);
const MomoStartOfDay = require('../modules/Momo/Models/MomoStartOfDay')(sequelize, Sequelize);

const Transfer = require('../modules/Tansfer/Models/Transfer')(sequelize, Sequelize);
const TransferEndOfDay = require('../modules/Tansfer/Models/TransferEndOfDay')(sequelize, Sequelize);
const TransferStartOfDay = require('../modules/Tansfer/Models/TransferStartOfDay')(sequelize, Sequelize);

/**
 * Set up Relationships on the necessary models.
 */
User.belongsTo(Role);
Sale.belongsTo(Item);
Item.hasMany(Sale);
TransferEndOfDay.belongsTo(TransferStartOfDay);
MomoEndOfDay.belongsTo(MomoStartOfDay);
CreditCardType.hasMany(CreditCard);
CreditCardSale.belongsTo(CreditCard);
CreditCardPurchase.belongsTo(CreditCard);

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database: ', error));

/**
 * true for dropping and recreating tables
 */
const force = false;

sequelize.sync({ force })
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
                                const salt_rounds = 10;
                                const role_id = role.get('id');

                                bcrypt.hash(ADMIN_PASSWORD, salt_rounds, function (err, hash) {
                                    if (err) {
                                        return console.log('Could not hash default password');
                                    }

                                    if (hash) {
                                        User.create({
                                            role_id,
                                            password: hash,
                                            email: ADMIN_EMAIL,
                                            lastname: ADMIN_LASTNAME,
                                            firstname: ADMIN_FIRSTNAME
                                        });
                                    }
                                })
                            });
                    });
            })
    })
    .catch(error => console.error('Could not create tables: ', error));

/**
 * Export the models and Op operator
 */
module.exports = {
    Role,
    User,
    Item,
    Sale,
    Jackpot,
    Football,

    CreditCardType,
    CreditCard,
    CreditCardPurchase,
    CreditCardSale,

    MomoEndOfDay,
    MomoStartOfDay,

    Transfer,
    TransferStartOfDay,
    TransferEndOfDay,

    Op: Sequelize.Op
};
