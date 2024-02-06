import express, { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { config } from './config';
import { routes } from './routes';
import { errorHandler } from './middleware';
import { rateLimit } from 'express-rate-limit'

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

app.use(limiter);

app.use(helmet());

app.use(cors({ origin: config.allowedOrigins, credentials: true, methods: 'GET,PUT,POST'}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use('/v1', routes);

app.use(errorHandler);

export default app;