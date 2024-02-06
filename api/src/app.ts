import express, { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { config } from './config';
import { routes } from './routes';
import { errorHandler } from './middleware';

const app: Express = express();

app.use(helmet());

app.use(cors({ origin: config.allowedOrigins, credentials: true, methods: 'GET,PUT,POST'}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use('/v1', routes);

app.use(errorHandler);

export default app;