import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';
import TeamType from './TeamType';
import ActionType from './ActionType';
import CompetitionType from './CompetitionType';
import { generateApiUrl, cachedFetch } from '../../utils/api';
import fetch from 'node-fetch';

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
        const matchId = match['@matchID'];
        const url = generateApiUrl(
          'football/match/actions',
          matchId
        );

        return cachedFetch(url)
          .then(json => json.matchActions.actions.action)
      }
    }
  }
})
