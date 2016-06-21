import moment from 'moment';

// Validate date string for the format DD/MM/YYYY
export function isValidDate(date) {
  return moment(date, 'DD/MM/YYYY', true).isValid();
}


// Converts date string DD/MM/YYYY to the specific API format YYYYMMDD
export function toAPIDate(date) {
  return moment(date, 'DD/MM/YYYY').format('YYYYMMDD');
}
