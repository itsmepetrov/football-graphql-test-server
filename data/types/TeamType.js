import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import ImageType from './ImageType';
import { generateApiUrl } from '../../utils/api';

// Define the Team type with next fields: `id`, `name`, `badge` as ImageType,
// `score`, `scorers` as List Of String.
// The type of Team is GraphQLObjectType, which has child fields
// with their own types.
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
        // Generate image url by team id, width and height
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
        // Convert scorers string to array of scorers
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
