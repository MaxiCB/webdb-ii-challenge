const express = require('express');

const carRouter = require('./cars/carRouter');

const server = express();

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );
  
    next();
  }

server.use(express.json());
server.use(logger);

server.use("/api/cars", carRouter);

module.exports = server;