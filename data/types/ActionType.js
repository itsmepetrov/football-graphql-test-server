import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import PlayerType from './PlayerType';

// import TeamType from './TeamType';
// import * as loaders from '../loaders'

// const teamField = {
//   type: TeamType,
//   resolve: (source) => {
//     const teamId = source['@teamID'];
//     return loaders.team.load(teamId);
//   }
// }

export default new GraphQLObjectType({
  name: 'Action',
  fields: {
    eventType: {
      type: GraphQLString
    },
    matchTime: {
      type: GraphQLString
    },
    eventTime: {
      type: GraphQLString
    },
    normalTime: {
      type: GraphQLString
    },
    addedTime: {
      type: GraphQLString
    },
    whereFrom: {
      type: GraphQLString
    },
    whereFrom: {
      type: GraphQLString
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: (action) =>
        Object.keys(action.players)
          .map(key => action.players[key])
          .filter(player => player['@playerID'])
    }
  }
});
