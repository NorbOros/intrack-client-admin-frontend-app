import moment from 'moment/moment';

export const parseStringToTime = (dateTime) => {
    if (dateTime !== 'undefined')
        return moment(dateTime).format('HH:mm');
}