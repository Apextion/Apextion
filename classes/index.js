class Inmate {
  constructor(props) {
    const {
      uuid = null,
      first_name = null,
      last_name = null,
      date_dob = null,
      bookings = [],
    } = props;
    this.uuid = uuid;
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_dob = date_dob;
    this.bookings = bookings;
  }
}

class Booking {
  constructor(props) {
    const {
      booking_id = null,
      first_name = null,
      last_name = null,
      pic_url = null,
      date_dob = null,
      date_arrest = null,
      direct_link = null,
    } = props;
    this.booking_id = booking_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.pic_url = pic_url;
    this.date_dob = date_dob;
    this.date_arrest = date_arrest;
    this.direct_link = direct_link;
  }
}

module.exports = { Inmate, Booking };
