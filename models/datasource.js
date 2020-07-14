const Datastore = require('nedb');
const db = new Datastore();

exports.find = (query, cb) => {
  db.find(query, cb);
};

exports.findOne = (query, cb) => {
  db.findOne(query, cb);
};

exports.insert = (payload, cb) => {
  db.insert(payload, cb);
};

exports.update = (query, updatePayload, options, cb) => {
  db.update(query, updatePayload, options, cb);
};

exports.remove = (query, cb) => {
  db.remove(query, cb);
};

exports.getAllData = () => {
  return db.getAllData();
};
