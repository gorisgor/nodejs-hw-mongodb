import express from 'express';

import pino from 'pino-http';

import cors from 'cors';

import { getAllContacts, getContactById } from './services/contacts.js';

import { env } from './utils/env.js'

export const setupServer = () => {
    const app =express();
    const logger = pino({
          transport: {
              target: "pino-pretty"
          }
      });
    app.use(logger);  
    app.use(cors());
    app.use(express.json());

    app.get("/contacts", async (req, res)=> {
      const data = await getAllContacts();

       res.json({
           status: 200,
           message: "Successfully found contacts!",
           data,
       });
   });

   app.get("/contacts/:id", async(req, res)=> {
       const {id} = req.params;
       const data = await getContactById(id);

       if(!data) {
           return res.status(404).json({
               message: `Contact with id=${id} not found!`
           });
       }

       res.json({
           status: 200,
           message: `Successfully found contact with id=${id}!`,
           data,
       });
   });


  
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next)=> {
    res.status(500).json({
        message: error.message,
    });
});

const port = Number(env("PORT", 3000));
  app.listen(port, ()=> console.log(`Server running on ${port} PORT`));
}