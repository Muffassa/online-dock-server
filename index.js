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

  if (token) {
    try {
      const {user} = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
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
  graphqlExpress({
    schema,
    context: {
      models,
      SECRET,
      SECRET2,
    },
  })
);

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

models.sequelize.sync({force: true}).then(() => {
  app.listen(8081);
});
