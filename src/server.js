import express from 'express';

import pino from 'pino-http';

import cors from 'cors';

import dotenv from "dotenv";

dotenv.config();
const PORT = Number(process.env.PORT);

export const setupServer = () => {
    const app =express();
    app.use(cors());
    app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, ()=> console.log(`Server running on ${PORT} PORT`));
}