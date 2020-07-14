const dataSource = require('../models/datasource');

const dateFormat = require('dateformat');

const randomiseDate = function (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomiseNumber = function (from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const randomiseFirstName = function () {
  const name = ['Mark', 'Mary', 'Sally', 'Jim', 'Eric', 'Susan'];

  return name[randomiseNumber(0, name.length - 1)];
};

const randomiseLastName = function () {
  const surname = ['Jones', 'Wilson', 'Jackson', 'Brown', 'Smith', 'Ericsson'];

  return surname[randomiseNumber(0, surname.length - 1)];
};

const randomiseBool = function () {
  const bool = [true, false];

  return bool[randomiseNumber(0, bool.length - 1)];
};

exports.createBooking = function () {
  const checkInDate = randomiseDate(new Date(2015, 1, 1), new Date());
  const latestDate = new Date();
  latestDate.setDate(latestDate.getDate() + 3);

  const booking = {
    firstname: randomiseFirstName(),
    lastname: randomiseLastName(),
    totalprice: randomiseNumber(100, 1000),
    depositpaid: randomiseBool(),
    bookingdates: {
      checkin: dateFormat(checkInDate.setHours(15, 0, 0, 0), 'yyyy-mm-dd'),
      checkout: dateFormat(
        randomiseDate(checkInDate, latestDate).setHours(12, 0, 0, 0),
        'yyyy-mm-dd'
      ),
    },
  };

  if (randomiseBool()) {
    booking.additionalneeds = 'Breakfast';
  }

  return booking;
};
