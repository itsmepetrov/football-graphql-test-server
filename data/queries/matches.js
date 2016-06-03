import {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';
import { MatchType } from '../types';
import { isValidDate, toAPIDate } from '../../utils/date';
import fetch from 'node-fetch';
import config from 'config';

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

    const url = `${config.api.host}:${config.api.port}/${config.api.path}/football/competitions/matchDay/${config.api.token}/${toAPIDate(date)}/json`;

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
