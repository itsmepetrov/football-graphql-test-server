import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { MatchType } from '../types';
import { isValidDate, toAPIDate } from '../../utils/date';
import { generateApiUrl, cachedFetch } from '../../utils/api';

export default {
  name: 'Matches',
  type: new GraphQLList(MatchType),
  // `args` describes the arguments that the `matches` query accepts
  args: {
    date: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The required date in DD/MM/YYYY format.'
    }
  },
  // The resolve function describes how to "resolve" or fulfill
  // the incoming query.
  // In this case we use the `date` argument from above as a key
  // to get the List of Matches from `External API`
  resolve: (root, { date }) => {
    // Validate passed date
    if (!isValidDate(date)) {
      throw new Error(`Invalid date format: ${date}, must be in DD/MM/YYYY`);
    }
    // Generate request url
    const url = generateApiUrl(
      '/football/competitions/matchDay',
      toAPIDate(date)
    );
    // Request List of Matches for the date
    return cachedFetch(url)
      .then(json => {
        const { match } = json.matches;
        if (!match) {
          return [];
        } else if (Array.isArray(match)) {
          return match;
        } else {
          return [match];
        }
      })
  }
}
