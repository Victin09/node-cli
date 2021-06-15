import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import databaseConfig from './common/config/database.config';
import { UsersRoutes } from './route/users.route';
import { CommonRoutesConfig } from './common/config/routes.config';

/**
 * Define application variables
 */
const app: express.Application = express();
const port = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];
const log: debug.IDebugger = debug('app');

/**
 * Configure express server
 */
// Here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());

// Here we are adding middleware to allow cross-origin requests
app.use(cors());

// Here we are preparing the expressWinston logging middleware configuration,
//      which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// Initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// Init routes
routes.push(new UsersRoutes(app));

createConnection(databaseConfig)
    .then((_connection) => {
        app.listen(port, () => {
            // Here we are adding the UserRoutes to our array,
            //      after sending the Express.js application object to have the routes added to our app!
            routes.forEach((route: CommonRoutesConfig) => {
                log(`Routes configured for ${route.getName()}`);
            });
            console.log('Server is running on port', port);
        });
    })
    .catch((err) => {
        console.log('Unable to connect to db', err);
        process.exit(1);
    });