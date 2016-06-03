import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} from 'graphql';
import { ActionType } from '../types';
import { isValidDate, toAPIDate } from '../../utils/date';
import { generateApiUrl } from '../../utils/api';
import fetch from 'node-fetch';

export default {
  name: 'Actions',
  type: new GraphQLList(ActionType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID of the match'
    }
  },
  resolve: (root, { id }) => {
    const url = generateApiUrl(
      'football/match/actions',
      id
    );

    return fetch(url)
      .then(res => res.json())
      .then(json => json.matchActions.actions.action)
  }
}
