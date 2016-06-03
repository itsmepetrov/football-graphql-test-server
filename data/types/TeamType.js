import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Team',
  fields: {
    id: {
      type: GraphQLString,
      resolve: (team) => team['@teamID']
    },
    name: {
      type: GraphQLString,
      resolve: (team) => team.teamName
    },
    score: {
      type: GraphQLInt,
      resolve: (team) => team.score
    },
    scorers: {
      type: new GraphQLList(GraphQLString),
      resolve: (team) => {
        const scorers = team.scorers['#cdata-section'];
        if (scorers) {
          return scorers.split(',');
        } else {
          return [];
        }
      }
    }
  }
})
