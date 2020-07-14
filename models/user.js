const { find, findOne, insert, update, remove } = require('./datasource');

let counter = 0;

exports.create = (payload, callback) => {
  counter++;
  payload.userId = counter;
  insert(payload, function (err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, payload);
    }
  });
};

exports.get = function (id, callback) {
  findOne({ userId: parseInt(id) }, function (err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};

exports.getAllUsers = function (query, callback) {
  find(query, function (err, users) {
    if (err) {
      callback(err);
    } else {
      callback(null, users);
    }
  });
};
