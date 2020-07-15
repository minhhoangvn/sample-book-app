const { makeExecutableSchema } = require('apollo-server-express');
const {
  getAllBookResolver,
  getAllUserResolver,
  getBookResolver,
  getUserResolver,
  createBookingResolver,
  createUserResolver,
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

const typeMutationDefs = `

  input UserInput {
    firstname: String
    lastname: String
    email: String
  }

  input BookingInput{
    firstname: String
    lastname: String
    totalprice: Int
    depositpaid: Boolean
    bookingdates: BookingDatesInput
  }

  input BookingDatesInput {
    checkin: String
    checkout: String
  }

  type Mutation {
      createBooking (
        input: BookingInput
      ): Book

      craeteUser(
        input:UserInput
      ): User
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
  Mutation: {
    createBooking: createBookingResolver,
    craeteUser: createUserResolver,
  },
};

const schema = makeExecutableSchema({
  typeDefs: [typeQueryDefs, typeBookDefs, typeUserDefs, typeMutationDefs],
  resolvers,
});

exports.schema = schema;
