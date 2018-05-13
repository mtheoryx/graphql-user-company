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
const _ = require('lodash'); //I don't think we need this, but whatevs

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

// What is a user?
const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '42', firstName: 'Samantha', age: 30 }
];
/** 
 * id: Integer
 * firstName: String
 * company_id: Integer
 * position_id: Integer
 * users: Array<User>
 * 
 */
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
        return _.find(users, { id: args.id })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
