import express, { Express, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';

import { config } from './config/config';
import bookRoutes from './routes/book';
import reservationRoutes from './routes/reservation';

const app: Express = express();

const StartServer = () => {
  app.use((req, res, next) => {
    console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
  });
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.use('/api/books', bookRoutes);
app.use('/api/books/reservation', reservationRoutes);

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Mongo connected successfully.');
    StartServer();
  })
  .catch((error) => console.error(error));

/** Healthcheck */
app.get('/api/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

app.use((req, res, next) => {
  const error = new Error('Not found');

  console.error(error);

  res.status(404).json({
    message: error.message
  });
});

http.createServer(app).listen(config.server.port, () => console.info(`Server is running on port ${config.server.port}`));
