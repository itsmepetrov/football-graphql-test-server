import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import TeamType from './TeamType';
import CompetitionType from './CompetitionType';

export default new GraphQLObjectType({
  name: 'Match',
  fields: {
    id: {
      type: GraphQLString,
      resolve: (match) => match['@matchID']
    },
    date: {
      type: GraphQLString,
      resolve: (match) => match['@date']
    },
    competition: {
      type: CompetitionType
    },
    homeTeam: {
      type: TeamType
    },
    awayTeam: {
      type: TeamType
    }
  }
})
