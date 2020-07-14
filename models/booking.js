const { find, findOne, insert, update, remove } = require('./datasource');

let counter = 0;

exports.getAllBooking = function (query, callback) {
  find(query, function (err, booking) {
    if (err) {
      callback(err);
    } else {
      callback(null, booking);
    }
  });
};

exports.getIDs = function (query, callback) {
  find(query, function (err, booking) {
    if (err) {
      callback(err);
    } else {
      callback(null, booking);
    }
  });
};

exports.get = function (id, callback) {
  findOne({ bookingId: parseInt(id) }, function (err, booking) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, booking);
    }
  });
};

exports.create = function (payload, callback) {
  counter++;
  payload.bookingId = counter;

  insert(payload, function (err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, payload);
    }
  });
};

exports.update = function (id, updatedBooking, callback) {
  update({ bookingId: parseInt(id) }, { $set: updatedBooking }, {}, function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

exports.delete = function (id, callback) {
  remove({ bookingId: parseInt(id) }, function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

exports.deleteAll = function (callback) {
  counter = 0;

  remove({}, function (err) {
    callback();
  });
};
