// Companies
/**
 * id: Integer
 * name: String
 * description: String
 * 
 */

// Positions
/**
 * id: Integer
 * name: String
 * description: String
 */

const graphql = require('graphql');
const axios = require ('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...', //Optional

  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: '...', //Optional

  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(response => response.data);
      }
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve() {
        return axios
          .get(`http://localhost:3000/users/`)
          .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
