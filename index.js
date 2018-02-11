const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
import path from 'path';
import {fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';
import models from './models';
import cors from 'cors';

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
app.use(cors('*'));
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

models.sequelize.sync().then(() => {
  app.listen(8081);
});
