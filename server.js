const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

require('./src/database');

/** Import Routes */
const {
    RoleRoute,
    UserRoute,
    ItemRoute,
    SaleRoute,
    JackpotRoute,
    FootballRoute,
    MobileMoneyRoute,
    CreditCardRoute,
    CreditTransferRoute
} = require('./src/routes');

/** Import checkAuth middleware */
const { checkAuth } = require('./src/middlewares');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }

    next();
});

/** Assign routes to modules */
app.use('/roles', RoleRoute);
app.use('/users', UserRoute);
app.use('/items', checkAuth, ItemRoute);
app.use('/sales', checkAuth, SaleRoute);
app.use('/jackpots', checkAuth, JackpotRoute);
app.use('/footballs', checkAuth, FootballRoute);
app.use('/mobile_moneys', checkAuth, MobileMoneyRoute);
app.use('/credit_cards', checkAuth, CreditCardRoute);
app.use('/credit_transfers', checkAuth, CreditTransferRoute);

/** If the route has not been matched up to this point then give 404 error */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: "Not found"
        }
    });
});

const server = http.Server(app);

server.listen(5000, () => console.log('Server is running'));
