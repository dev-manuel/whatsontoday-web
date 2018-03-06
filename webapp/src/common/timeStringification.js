import moment from 'moment'

/**
 * 
 * @param {Date} from 
 * @param {Date} to 
 * @param {{locale: string, to: string}} time
 * @returns {{firstLine: string, secondLine: string, isSameDay: boolean}}
 */
export const stringifyTime = (from, to, time) => {
    const momentFrom = moment(from).locale(time.locale);
    const momentTo = moment(to).locale(time.locale);

    if(momentFrom.isSame(momentTo, 'day')){
        return {
            firstLine: momentFrom.format('ddd DD MMM YYYY'),
            secondLine: `${momentFrom.format('HH:mm')} ${time.to} ${momentTo.format('HH:mm')}`,
            isSameDay: true,
        }
    }else{
        return {
            firstLine: momentFrom.format('ddd DD MMM YYYY HH:mm'),
            secondLine: `${time.to} ${momentTo.format('ddd DD MMM YYYY HH:mm')}`,
            isSameDay: false,
        }
    }
    
}

/**
 * 
 * @param {Date} from 
 * @param {Date} to 
 * @param {string} locale
 */
const isEqualDay = (from, to, locale) => {
    const momentFrom = moment(from).locale(locale);
    const momentTo = moment(to).locale(locale);

    let isEqual = true;

    // Check if years of the dates are equal
    if(momentFrom.year() === momentTo.year()){
        isEqual = false
    }

    // Check if days of the dates are equal
    if(momentFrom.dayOfYear() === momentTo.dayOfYear()){
        isEqual = false
    }

    return isEqual;
}