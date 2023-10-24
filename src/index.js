/* eslint-disable import/extensions */

import express from 'express';
import helmet from 'helmet';
import { xss } from 'express-xss-sanitizer';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import compression from 'compression';
import morgan from 'morgan';
// import winston from "winston";
import 'express-async-errors';
import sessionAuth from './routes/sessionAuth.js';
import tokenAuth from './routes/tokenAuth.js';
import task from './routes/task.js';
import { shouldCompress } from './middleware/compression.js';
import { notFound } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();
app.use(express.json());
dotenv.config();

// Env variables
const { PORT, DATABASE_URL, SECRET } = process.env;

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   defaultMeta: { service: "user-service" },
//   transports: [
//
// - Write all logs with importance level of `error` or less to `error.log`
// - Write all logs with importance level of `info` or less to `combined.log`
//
//     new winston.transports.File({ filename: "error.log", level: "error" }),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//   );
// }

const env = app.get('env') === 'production';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, check back in 5 minutes.',
});

// Mongo store
const mongoStore = MongoStore.create({
  mongoUrl: DATABASE_URL,
  collectionName: '_session',
});

/**
 * Session option
 */
const sessionOptions = {
  name: 'KCTM_session',
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env,
    maxAge: 60 * 60 * 24 * 7,
  },
  store: mongoStore,
};

/**
 * Application level middleware
 */
app.use(morgan('common'));
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use('/', express.static('public'));
app.use(session(sessionOptions));
app.use(compression({ shouldCompress, threshold: 10 }));

app.use('/session-auth', sessionAuth);
app.use('/token-auth', tokenAuth);
app.use('/tasks', task);

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port: ${PORT}`);
});
