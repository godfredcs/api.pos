const sequelize = require('sequelize');
const Sequelize = require('../../db_connection');

/** Routes */
const UserRoute = require('./User/Route');
const SaleRoute = require('./Sale/Route');
const ItemRoute = require('./Item/Route');
const JackpotRoute = require('./Jackpot/Route');
const FootballRoute = require('./Football/Route');
const CreditCardRoute = require('./CreditCard/Route');
const MobileMoneyRoute = require('./MobileMoney/Route');
const CreditTransferRoute = require('./CreditTansfer/Route');

/** Models */
const Role = require('./Role/Model');
const User = require('./User/Model');
const Item = require('./Item/Model');
const Sale = require('./Sale/Model');
const Jackpot = require('./Jackpot/Model');
const Football = require('./Football/Model');
const CreditCard = require('./CreditCard/Model');
const MobileMoney = require('./MobileMoney/Model');
const CreditTransfer = require('./CreditTansfer/Model');

Role = Role(Sequelize, sequelize);
User = User(Sequelize, sequelize);
Item = Item(Sequelize, sequelize);
Sale = Sale(Sequelize, sequelize);
Jackpot = Jackpot(Sequelize, sequelize);
Football = Football(Sequelize, sequelize);
CreditCard = CreditCard(Sequelize, sequelize);
MobileMoney = MobileMoney(Sequelize, sequelize);
CreditTransfer = CreditTransfer(Sequelize, sequelize);

exports.routes = {
    UserRoute,
    ItemRoute,
    SaleRoute,
    JackpotRoute,
    FootballRoute,
    CreditCardRoute,
    MobileMoneyRoute,
    CreditTransferRoute
};

exports.models = {
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
