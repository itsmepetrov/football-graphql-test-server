import express from 'express';
import graphql from 'graphql';
import graphqlHTTP from 'express-graphql';
import schema from './data/schema';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '5000';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

// Create express instance
const app = express();

// Mount express-graphql as middleware
app.use('/graphql', graphqlHTTP({
  graphiql: DEVELOPMENT,
  pretty: true,
  schema
}));

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening at http://' + HOST + ':' + PORT);
  }
});
