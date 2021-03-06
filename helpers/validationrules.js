exports.returnBookingExistUserRuleSet = function () {
  var constraints = {
    totalprice: { presence: true },
    depositpaid: { presence: true },
    'bookingdates.checkin': { presence: true },
    'bookingdates.checkout': { presence: true },
  };

  return constraints;
};

exports.returnBookingRuleSet = function () {
  var constraints = {
    firstname: { presence: true },
    lastname: { presence: true },
    totalprice: { presence: true },
    depositpaid: { presence: true },
    'bookingdates.checkin': { presence: true },
    'bookingdates.checkout': { presence: true },
  };

  return constraints;
};

exports.returnUserRuleSet = function () {
  var constraints = {
    firstname: { presence: true },
    lastname: { presence: true },
    email: { presence: true, email: true },
    password: { presence: true },
  };

  return constraints;
};
