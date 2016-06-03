import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Competition',
  fields: {
    id: {
      type: GraphQLString,
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
