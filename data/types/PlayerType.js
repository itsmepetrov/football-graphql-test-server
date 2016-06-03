import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

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
