const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
//const { authLimiter } = require('./src/middlewares/rate-limiter');
const routes = require('./src/routes');

// const { errorConverter, errorHandler } = require('./src/middlewares/error');
const ApiError = require('./src/utils/ApiError');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
//app.use(xss());

// gzip compression
//app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(cookieParser());

// api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
//app.use(errorConverter);

// handle error
//app.use(errorHandler);

module.exports = app;




//npx sequelize-cli model:generate --name User --attributes firstName:string,lastname:string,cellphone:string,adrress:string,lastName:string,email:string,creationdate:date,citycode:integer