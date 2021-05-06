// const https = require('https');
//const http = require('http');
// const fs = require('fs');
// const app = require('./app');
// const logger = require('./src/config/logger');

// let server;

// server = http.createServer(app).listen(3000, () => {
//     logger.info(`Listening to port 3000`);
// });

// const exitHandler = () => {
//     if (server) {
//         server.close(() => {
//             logger.info('Server closed');
//             process.exit(1);
//         });
//     } else {
//         process.exit(1);
//     }
// };

// const unexpectedErrorHandler = (error) => {
//     logger.error(error);
//     exitHandler();
//};

// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);
// process.on('SIGTERM', () => {
//     logger.info('SIGTERM received');
//     if (server) {
//         server.close();
//     }
// });

const http = require('http');
const debug = require('debug')('hola:server');
const app = require('./app');
require('dotenv').config()
/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  // eslint-disable-next-line no-console
  console.log(`Listening on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
