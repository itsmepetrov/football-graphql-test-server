import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { MatchType } from '../types';
import { generateApiUrl, cachedFetch } from '../../utils/api';

export default {
  name: 'Match',
  type: MatchType,
  // `args` describes the arguments that the `match` query accepts
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the team'
    }
  },
  // The resolve function describes how to "resolve" or fulfill
  // the incoming query.
  // In this case we use the `id` argument from above as a key
  // to get the Match from `External API`
  resolve: (root, { id }) => {
    // Generate request url
    const url = generateApiUrl(
      '/football/match/info',
      id
    );
    // Request Match by ID
    return cachedFetch(url)
      .then(json => json.matches.match)
  }
}
