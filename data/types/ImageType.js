import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

// Define the Image type with next fields: `url`, `width`, `height`.
// The type of Image is GraphQLObjectType, which has child fields
// with their own types.
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
