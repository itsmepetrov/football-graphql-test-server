import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { MatchType } from '../types';
import { generateApiUrl } from '../../utils/api';
import fetch from 'node-fetch';

export default {
  name: 'Match',
  type: MatchType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the team'
    }
  },
  resolve: (root, { id }) => {
    const url = generateApiUrl(
      '/football/match/info',
      id
    );

    return fetch(url)
      .then(res => res.json())
      .then(json => json.matches.match)
  }
}
