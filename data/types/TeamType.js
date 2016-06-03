import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import ImageType from './ImageType';
import { generateApiUrl } from '../../utils/api';

export default new GraphQLObjectType({
  name: 'Team',
  fields: {
    id: {
      type: GraphQLString,
      resolve: (team) => team['@teamID']
    },
    name: {
      type: GraphQLString,
      resolve: (team) => team.teamName
    },
    badge: {
      type: ImageType,
      args: {
        width: {
          type: GraphQLInt,
          defaultValue: 200
        },
        height: {
          type: GraphQLInt,
          defaultValue: 200
        }
      },
      resolve: (team, { width, height }) => {
        const url = generateApiUrl(
          '/football/team/badge',
          `${team['@teamID']}/${width}/${height}`,
          false
        );

        return {
          url,
          width,
          height
        }
      }
    },
    score: {
      type: GraphQLInt,
      resolve: (team) => team.score
    },
    scorers: {
      type: new GraphQLList(GraphQLString),
      resolve: (team) => {
        const scorers = team.scorers['#cdata-section'];
        if (scorers) {
          return scorers.split(',');
        } else {
          return [];
        }
      }
    }
  }
})
