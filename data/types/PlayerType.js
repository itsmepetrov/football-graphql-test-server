import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

// Define the Player type with next fields: `id`, `name`, `teamId`.
// The type of Player is GraphQLObjectType, which has child fields
// with their own types.
export default new GraphQLObjectType({
  name: 'Player',
  fields: {
    id: {
      type: GraphQLID,
      resolve: (match) => match['@playerID']
    },
    name: {
      type: GraphQLString,
      resolve: (match) => match['#text']
    },
    teamId: {
      type: GraphQLID,
      resolve: (match) => match['@teamID']
    }
  }
});
