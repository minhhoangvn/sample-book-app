var rules = require('../helpers/validationrules'),
  validate = require('validate.js');

exports.scrubAndValidateBooking = function (payload, callback) {
  if (payload.firstname) {
    payload.firstname = payload.firstname.trim();
  }

  if (payload.lastname) {
    payload.lastname = payload.lastname.trim();
  }

  callback(payload, validate(payload, rules.returnBookingRuleSet()));
};

exports.scrubAndValidateBookingWithExistUser = function (payload, callback) {
  callback(payload, validate(payload, rules.returnBookingExistUserRuleSet()));
};

exports.scrubAndValidateUser = function (payload, callback) {
  if (payload.firstname) {
    payload.firstname = payload.firstname.trim();
  }

  if (payload.lastname) {
    payload.lastname = payload.lastname.trim();
  }
  if (payload.email) {
    payload.email = payload.email.trim();
  }

  callback(payload, validate(payload, rules.returnUserRuleSet()));
};
