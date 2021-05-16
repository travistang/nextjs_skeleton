import "reflect-metadata";

import express from 'express';
import { createServer } from "http";
import { connect } from "mongoose";
import next from "next";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { TypegooseMiddleware } from "./typegoose-middleware";
import { ObjectIdScalar } from "./object-id.scalar";
import { ObjectId } from "mongodb";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

app.prepare()
  .then(() => buildSchema({
    resolvers: [__dirname + '/**/*.resolver.{ts,js}'],
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  }))
  .then((schema) => new ApolloServer({ schema }))
  .then(async (apolloServer) => {
    await apolloServer.start();
    await connect(MONGO_URL);

    const app = express();

    const httpServer = createServer(app);
    apolloServer.applyMiddleware({ app });

    app.use('/healthcheck', (req, res) => res.status(200).send('OK'));

    app.all('*', (req, res) => {
      return handle(req, res);
    });
    httpServer.listen({ port }, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  }).catch((error) => {
    console.log("Error:::::", error)
  });
