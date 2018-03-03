const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
import path from 'path';
import {fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import models from './models';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {refreshTokens} from './auth';
import jwt from 'jsonwebtoken';
import winston from 'winston';
import {execute, subscribe} from 'graphql';
import {createServer} from 'http';
import {SubscriptionServer} from 'subscriptions-transport-ws';

const SECRET = 'asdnkljbnqwe423123xzc654wq';
const SECRET2 = 'll;kwenzxc324mz,12asdmn,';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(async (req, res, next) => {
  const {token, refreshToken} = req.cookies;

  winston.info('User token', token);
  if (token) {
    try {
      const {user} = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      winston.error(err);
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
        SECRET2
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.cookie('token', newTokens.token);
        res.cookie('refreshToken', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress((req) => ({
    schema,
    context: {
      models,
      SECRET,
      SECRET2,
      user: req.user,
    },
  }))
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:8081/subscriptions`,
  })
);

const server = createServer(app);
models.sequelize.sync().then(() => {
  server.listen(8081, () => {
    console.log(`Apollo Server is now running on http://localhost:8081`);
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema,
      },
      {
        server: server,
        path: '/subscriptions',
      }
    );
  });
});
