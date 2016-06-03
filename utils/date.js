import moment from 'moment';

export function isValidDate(date) {
  return moment(date, 'DD/MM/YYYY', true).isValid();
}

export function toAPIDate(date) {
  return moment(date, 'DD/MM/YYYY').format('YYYYMMDD');
}
