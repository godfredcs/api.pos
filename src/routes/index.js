/** Routes */
const RoleRoute = require('../modules/Role/Route');
const UserRoute = require('../modules/User/Route');
const ItemRoute = require('../modules/Item/Route');
const SaleRoute = require('../modules/Sale/Route');
const JackpotRoute = require('../modules/Jackpot/Route');
const FootballRoute = require('../modules/Football/Route');

const CreditCardRoute = require('../modules/CreditCard/Routes/CreditCard');
const CreditCardTypeRoute = require('../modules/CreditCard/Routes/CreditCardType')
const CreditCardSaleRoute = require('../modules/CreditCard/Routes/CreditCardSale');
const CreditCardPurchaseRoute = require('../modules/CreditCard/Routes/CreditCardPurchase');

const TransferRoute = require('../modules/Tansfer/Routes/Transfer');
const TransferEndOfDayRoute = require('../modules/Tansfer/Routes/TransferEndOfDay');
const TransferStartOfDayRoute = require('../modules/Tansfer/Routes/TransferStartOfDay');

const MomoEndOfDayRoute = require('../modules/Momo/Routes/MomoEndOfDay');
const MomoStartOfDayRoute = require('../modules/Momo/Routes/MomoStartOfDay');

module.exports = {
    RoleRoute,
    UserRoute,
    ItemRoute,
    SaleRoute,
    JackpotRoute,
    FootballRoute,

    CreditCardRoute,
    CreditCardTypeRoute,
    CreditCardSaleRoute,
    CreditCardPurchaseRoute,

    MomoEndOfDayRoute,
    MomoStartOfDayRoute,

    TransferRoute,
    TransferEndOfDayRoute,
    TransferStartOfDayRoute
};
