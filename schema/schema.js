const { makeExecutableSchema } = require('apollo-server-express');
const {
  getAllBookResolver,
  getAllUserResolver,
  getBookResolver,
  getUserResolver,
} = require('./resolvers');

const typeBookDefs = require('./book.typedef');
const typeUserDefs = require('./user.typedef');

const typeQueryDefs = `
  type Query {
    hello(name: String!): String
    users: [User]
    user(userId: ID!): User
    books: [Book]
    book(bookingId: ID!): Book
  }
`;

const resolvers = {
  Query: {
    hello: (_, args) => {
      return `Hello ${args.name}`;
    },
    users: getAllUserResolver,
    user: getUserResolver,
    books: getAllBookResolver,
    book: getBookResolver,
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeQueryDefs, typeBookDefs, typeUserDefs],
  resolvers,
});

exports.schema = schema;
