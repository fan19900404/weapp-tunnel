#!/usr/bin/env node

// 发布环境变量
process.env.NODE_ENV = 'production';

/**
 * Module dependencies.
 */

const http = require('http');
const app = require('./app');

// 全局tunnels，包含当前所有信道信息
global.tunnels={};

/**
 * Get port from environment and store in Express.
 */
/* eslint no-use-before-define: 0 */
const port = normalizePort(process.env.PORT || '8000');

/**
 * Create HTTP server.
 */

const server = http.createServer(app.callback());
const io = require('socket.io')(server);
require('./ws/index')(io);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  /* eslint no-shadow: 0 */
  const port = parseInt(val, 10);

  /* eslint no-restricted-globals: 0 */
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  /* eslint-disable no-console  */
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  // const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on http://localhost:${addr.port}`);
}
