import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { MatchType } from '../types';
import { isValidDate, toAPIDate } from '../../utils/date';
import { generateApiUrl } from '../../utils/api';
import fetch from 'node-fetch';

export default {
  name: 'Matches',
  type: new GraphQLList(MatchType),
  args: {
    date: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The required date in DD/MM/YYYY format.'
    }
  },
  resolve: (root, { date }) => {
    if (!isValidDate(date)) {
      throw new Error(`Invalid date format: ${date}, must be in DD/MM/YYYY`);
    }

    const url = generateApiUrl(
      '/football/competitions/matchDay',
      toAPIDate(date)
    );

    return fetch(url)
      .then(res => res.json())
      .then(json => {
        const { match } = json.matches;
        if (Array.isArray(match)) {
          return match;
        } else {
          return [match];
        }
      })
  }
}
