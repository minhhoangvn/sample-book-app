const { gql } = require('apollo-server-express');
const Booking = require('../models/booking');

const typeDefs = gql`
  type Book {
    bookingid: Int
    firstname: String
    lastname: String
    totalprice: Int
    depositpaid: Boolean
    bookingdates: BookingDates
  }

  type BookingDates {
    checkin: String
    checkout: String
  }
  type Query {
    hello: String
    books: [Book]
    book(id: ID!): Book
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    books: async () => {
      return new Promise((res, rej) => {
        Booking.getAllBooking({}, function (err, record) {
          if (!record) {
            rej(err);
          } else {
            record.sort((a, b) => {
              let comparison = 0;
              const bookingIdA = Number.parseInt(a.bookingid);
              const bookingIdB = Number.parseInt(b.bookingid);
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
