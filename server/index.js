import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ready } from 'consola';
import { Nuxt, Builder } from 'nuxt';
import apiRouter from './routes/api';
import config from '~/nuxt.config.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', apiRouter);

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production';

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, '0.0.0.0');
  ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
