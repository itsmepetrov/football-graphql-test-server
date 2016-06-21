import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';
import TeamType from './TeamType';
import ActionType from './ActionType';
import CompetitionType from './CompetitionType';
import { generateApiUrl, cachedFetch } from '../../utils/api';
import fetch from 'node-fetch';

// Define the Match type with next fields: `id`, `date`, `koTime`, `result`,
// `competition`, `homeTeam` as TeamType, `awayTeam` as TeamType,
// `actions` as List of ActionType.
// The type of Match is GraphQLObjectType, which has child fields
// with their own types.
export default new GraphQLObjectType({
  name: 'Match',
  fields: {
    id: {
      type: GraphQLID,
      resolve: (match) => match['@matchID']
    },
    date: {
      type: GraphQLString,
      resolve: (match) => match['@date']
    },
    koTime: {
      type: GraphQLString,
      resolve: (match) => match['@koTime']
    },
    result: {
      type: GraphQLBoolean,
      resolve: (match) => match.result === 'Yes'
    },
    competition: {
      type: CompetitionType
    },
    homeTeam: {
      type: TeamType
    },
    awayTeam: {
      type: TeamType
    },
    actions: {
      type: new GraphQLList(ActionType),
      resolve: (match) => {
        // Resolve Match ID
        const matchId = match['@matchID'];
        // Generate request url
        const url = generateApiUrl(
          'football/match/actions',
          matchId
        );

        // Request actions for current Match ID
        return cachedFetch(url)
          .then(json => json.matchActions.actions.action)
      }
    }
  }
})
