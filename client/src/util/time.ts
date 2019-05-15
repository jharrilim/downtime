import moment, { Moment } from 'moment';

export const traceOrDate = (momentTime: Moment) => {

    return function (thresholdHours: number = 24) {
        const now = moment();
        const hourDiff = now.diff(momentTime, 'hours');
        if (hourDiff > thresholdHours)
            return moment(momentTime).format('MMMM Do YYYY, h:mm:ss a');
        
        if (hourDiff > 0)
            return `${hourDiff} hours ago`;

        return `${momentTime.diff(now, 'minutes')} minutes ago`;
    }
}
