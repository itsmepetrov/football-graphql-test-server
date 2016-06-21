import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

// Define the Competition type with next fields: `id`, `seasonId`, `name`.
// The type of Competition is GraphQLObjectType, which has child fields
// with their own types.
export default new GraphQLObjectType({
  name: 'Competition',
  fields: {
    id: {
      type: GraphQLID,
      resolve: (match) => match['@competitionID']
    },
    seasonId: {
      type: GraphQLString,
      resolve: (match) => match['@seasonID']
    },
    name: {
      type: GraphQLString,
      resolve: (match) => match['#text']
    }
  }
})
