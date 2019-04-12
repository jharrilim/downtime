import moment from 'moment';

export const traceOrDate = (date: Date) => {

    return function (thresholdHours: number = 24) {
        const now = moment();
        const d = moment(date);
        const hourDiff = now.diff(d, 'hours');
        if (hourDiff > thresholdHours)
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        
        
        if (hourDiff > 0)
            return `${hourDiff} hours ago`;

        return `${now.diff(d, 'minutes')} minutes ago`
    }
}
