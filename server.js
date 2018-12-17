const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const modules = require('./src/modules');

// Import middleware checkAuth.
const checkAuth = require('./src/middlewares/checkAuth');

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

// Routes.
app.use('/users', modules.UserRoute);
app.use('/items', checkAuth, modules.ItemRoute);
app.use('/sales', checkAuth, modules.SaleRoute);
app.use('/mobile_money', checkAuth, modules.MobileMoneyRoute);
app.use('/football', checkAuth, modules.FootballRoute);
app.use('/jackpot', checkAuth, modules.JackpotRoute);
app.use('/credit_transfers', checkAuth, modules.CreditRoute);

// If the route has not been matched up to this point give 404 error.
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

server.listen(8000, () => console.log('this is the way of the server'))
