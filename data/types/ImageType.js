import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Image',
  fields: {
    url: {
      type: GraphQLString,
    },
    width: {
      type: GraphQLInt
    },
    height: {
      type: GraphQLInt
    }
  }
})
