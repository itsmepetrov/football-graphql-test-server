import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';
import {
  match,
  matches,
  actions
} from './queries';

// Define the schema with three top-level fields:
// `match` - that takes an `id` argument and returns the Match with that ID;
// `mathes` - that takes an `date` argument and returns the array of Matches for that DATE;
// `actions` - that takes an `id` argument and returns the actions for the Match with that ID;
export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      match,
      matches,
      actions
    }
  })
});
