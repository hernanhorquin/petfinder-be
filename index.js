const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require('./app');
const logger = require('./src/config/logger');

let server;

server = https.createServer(app).listen(3000, () => {
    logger.info(`Listening to port 3000`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);
// process.on('SIGTERM', () => {
//     logger.info('SIGTERM received');
//     if (server) {
//         server.close();
//     }
// });
