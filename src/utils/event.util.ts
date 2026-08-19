import moment from 'moment';

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  return moment(dateString).format('DD/MM/YYYY');
};
