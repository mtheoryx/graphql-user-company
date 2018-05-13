
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
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: '...', //Optional

  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(response => response.data);

      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...', //Optional

  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(response => response.data);
      }
    }
  })
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
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(response => response.data);
      }
    },
    getAllCompanies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return axios
          .get(`http://localhost:3000/companies/`)
          .then(response => response.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: '...', //Optional

  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName:  { type: new GraphQLNonNull(GraphQLString) }, //required!
        age:        { type: new GraphQLNonNull(GraphQLInt) }, //required!
        companyId:  { type: GraphQLString } //optional
      },
      resolve(parentValue, { firstName, age }) {
        return axios
          .post(`http://localhost:3000/users`, { firstName, age })
          .then(response => response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
