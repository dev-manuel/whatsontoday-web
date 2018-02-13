

/**
 * Converts a sql timestamp formatted string to a Date object
 * @param {string} timestamp sql timestamp string of the format "yyyy-mm-dd hh:mm:ss"
 * @returns {Date}
 */
export const sqlTimestampToDate = timestamp => {
    const digits = timestamp.split(/[-: ]/); // Splits the string on every dash colon or space
    const times = digits.map(digit => { // Converts the several string-coded time information to numbers
        return Number(digit);
    })
    // Create and return a Date object from this information
    return new Date(times[0], times[1]-1, times[2], times[3], times[4], times[5]);
}

/**
 * 
 * @param {Date} date 
 */
export const DateToSqlTimestamp = date => {
    
    const pad = number => {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    return date.getFullYear()  + '-' +
        pad(date.getMonth()+1) + '-' +
        pad(date.getDay())     + ' ' +
        pad(date.getHours())   + ':' +
        pad(date.getMinutes()) + ':' +
        pad(date.getSeconds());
}