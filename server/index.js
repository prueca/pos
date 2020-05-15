import express from 'express';
import { ready } from 'consola';
import { Nuxt, Builder } from 'nuxt';
import config from '../nuxt.config.js';
import apiRouter from './routes/api';

const app = express();

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
  app.listen(port, host);
  ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
