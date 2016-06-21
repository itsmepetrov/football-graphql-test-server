import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID
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

// Define the Action type with next fields: `eventType`, `teamId`, `matchTime`,
// `eventTime`, `normalTime`, `addedTime`, `whereFrom`, `players` as List of PlayerType.
// The type of Action is GraphQLObjectType, which has child fields
// with their own types.
export default new GraphQLObjectType({
  name: 'Action',
  fields: {
    eventType: {
      type: GraphQLString
    },
    teamId: {
      type: GraphQLID,
      resolve: (action) => action['@teamID']
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
    players: {
      type: new GraphQLList(PlayerType),
      resolve: (action) =>
        // Convert players to array
        Object.keys(action.players)
          .map(key => action.players[key])
          .filter(player => player['@playerID'])
    }
  }
});
