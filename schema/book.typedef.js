const typeDefs = `type Book {
    bookingId: Int
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
  `;

module.exports = typeDefs;
