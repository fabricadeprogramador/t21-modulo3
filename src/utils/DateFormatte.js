export default class DateFormatte {

  static getDateFormatter(date) {

    let day = "";
    let month = "";
    let year = "";

    if (!(date instanceof Date)) {
      date = new Date();
    } // if

    day = date.getDay();
    if (`${day}`.length <= 1) {
      day = `0${day}`;
    }

    month = date.getMonth() + 1;
    if (`${month}`.length <= 1) {
      month = `0${month}`;
    }

    year = date.getFullYear();

    return `${day}/${month}/${year}`;

  } // getDateFormatatter()

} // class
