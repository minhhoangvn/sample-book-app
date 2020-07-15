const Booking = require('../models/booking');
const User = require('../models/user');

const getAllUserResolver = async () => {
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
};

const getUserResolver = async (_, { userId }) => {
  return new Promise((res, rej) => {
    User.get(userId, function (err, record) {
      if (!record) {
        rej(err);
      } else {
        res(record);
      }
    });
  });
};

const getAllBookResolver = async () => {
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
};

const getBookResolver = (_, { bookingId }) => {
  return new Promise((res, rej) => {
    Booking.get(bookingId, function (err, record) {
      if (!record) {
        rej(err);
      } else {
        res(record);
      }
    });
  });
};

const createBookingResolver = (_, { input }) => {
  return new Promise((res, rej) => {
    Booking.create(input, (err, record) => {
      if (!record) rej(err);
      else res(record);
    });
  });
};

const createUserResolver = (_, { input }) => {
  return new Promise((res, rej) => {
    User.create(input, (err, record) => {
      if (!record) rej(err);
      else res(record);
    });
  });
};

module.exports = {
  getAllUserResolver,
  getUserResolver,
  getAllBookResolver,
  getBookResolver,
  createBookingResolver,
  createUserResolver,
};
