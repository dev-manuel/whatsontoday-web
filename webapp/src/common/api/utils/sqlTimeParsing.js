import log from 'loglevel'

/**
 * Converts a sql timestamp formatted string to a Date object
 * @param {string} timestamp sql timestamp string of the format "yyyy-mm-dd hh:mm:ss" (assuming represents a UTC+0 date)
 * @returns {Date}
 */
export const sqlTimestampToDate = timestamp => {
    
    //
    if( !/[1-9][0-9]{3}(-[0-9]{2}){2} [0-9]{2}(:[0-9]{2}){2}(?![^])/y.test(timestamp)){
        log.debug('sqlTimestampToDate#format', 'invalid');
        return null;
    }

    const digits = timestamp.split(/[-: ]/); // Splits the string on every dash colon or space
    const times = digits.map(digit => { // Converts the several string-coded time information to numbers
        return Number(digit);
    })
    // Create and return a Date object from this information
    return new Date(Date.UTC(times[0], times[1]-1, times[2], times[3], times[4], times[5]));
}

/**
 * 
 * @param {Date} date 
 * @returns {string} sql timestamp string of the format "yyyy-mm-dd hh:mm:ss" (represents a UTC+0 date)
 */
export const dateToSqlTimestamp = date => {

    if(!date){
        return '';
    }
    
    const pad = number => {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    return date.getUTCFullYear()  + '-' +
        pad(date.getUTCMonth()+1) + '-' +
        pad(date.getUTCDate())     + ' ' +
        pad(date.getUTCHours())   + ':' +
        pad(date.getUTCMinutes()) + ':' +
        pad(date.getUTCSeconds());
}