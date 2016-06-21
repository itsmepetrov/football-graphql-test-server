import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql';
import { ActionType } from '../types';
import { isValidDate, toAPIDate } from '../../utils/date';
import { generateApiUrl, cachedFetch } from '../../utils/api';

export default {
  name: 'Actions',
  type: new GraphQLList(ActionType),
  // `args` describes the arguments that the `actions` query accepts
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the match'
    }
  },
  // The resolve function describes how to "resolve" or fulfill
  // the incoming query.
  // In this case we use the `id` argument from above as a key
  // to get the Actions for Match from `External API`
  resolve: (root, { id }) => {
    // Generate request url
    const url = generateApiUrl(
      'football/match/actions',
      id
    );
    // Request actions for current Match ID
    return cachedFetch(url)
      .then(json => json.matchActions.actions.action)
  }
}
