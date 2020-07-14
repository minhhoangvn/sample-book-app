const { gql } = require('apollo-server-express');
const Booking = require('../models/booking');
const User = require('../models/user');

const typeDefs = gql`
  type Book {
    bookingId: Int
    firstname: String
    lastname: String
    totalprice: Int
    depositpaid: Boolean
    bookingdates: BookingDates
  }

  type User {
    userId: Int
    firstname: String
    lastname: String
    email: String
  }

  type BookingDates {
    checkin: String
    checkout: String
  }
  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
    books: [Book]
    book(id: ID!): Book
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    users: async () => {
      return new Promise((res, rej) => {
        User.getAllUsers({}, function (err, record) {
          if (!record) {
            rej(err);
          } else {
            record.sort((a, b) => {
              let comparison = 0;
              const userIdA = Number.parseInt(a.userId);
              const userIdB = Number.parseInt(b.userId);
              if (userIdA < userIdB) {
                comparison = -1;
              } else if (userIdA > userIdB) {
                comparison = 1;
              }
              return comparison;
            });
            res(record);
          }
        });
      });
    },
    user: async (_, { id }) => {
      return new Promise((res, rej) => {
        User.get(id, function (err, record) {
          if (!record) {
            rej(err);
          } else {
            res(record);
          }
        });
      });
    },
    books: async () => {
      return new Promise((res, rej) => {
        Booking.getAllBooking({}, function (err, record) {
          if (!record) {
            rej(err);
          } else {
            record.sort((a, b) => {
              let comparison = 0;
              const bookingIdA = Number.parseInt(a.bookingId);
              const bookingIdB = Number.parseInt(b.bookingId);
              if (bookingIdA < bookingIdB) {
                comparison = -1;
              } else if (bookingIdA > bookingIdB) {
                comparison = 1;
              }
              return comparison;
            });
            res(record);
          }
        });
      });
    },
    book: (_, { id }) => {
      return new Promise((res, rej) => {
        Booking.get(id, function (err, record) {
          if (!record) {
            rej(err);
          } else {
            res(record);
          }
        });
      });
    },
  },
};

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
