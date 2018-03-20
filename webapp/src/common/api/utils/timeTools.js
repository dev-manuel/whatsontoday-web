import moment from 'moment'

export const timeExpressions = {
    TOMORROW: 'tomorrow',
    WEEK: 'week',
    WEEKEND: 'weekend',
    MONTH: 'month',
}

/**
 * 
 * @param {string} expression 
 * @param {Date} currentDate 
 * @param {string} locale
 */
export const parseTimeExpression = (expression, currentDate, locale) => {
    moment.locale(locale);

    switch(expression){
        case timeExpressions.TOMORROW:
            const tomorrow = moment(currentDate).add(1,'day');

            
            return {
                from: tomorrow.startOf('day').toDate(),
                to: tomorrow.endOf('day').toDate(),
            }
        break;

        // CurrentDate to end of the week
        case timeExpressions.WEEK:
            return {
                from: currentDate,
                to: moment(currentDate).endOf('week').toDate(),
            }
        break;

        case timeExpressions.WEEKEND:
            const endOfTheWeekend = moment(currentDate).endOf('week');
            const startOfTheWeekend = moment(endOfTheWeekend.valueOf() - 48 * 60 * 60 * 1000);

            return {
                from: moment(currentDate).isBefore(startOfTheWeekend) ? startOfTheWeekend.toDate() : currentDate,
                to: endOfTheWeekend.toDate(),
            }
        break;

        case timeExpressions.MONTH:
            return {
                from: moment(currentDate).startOf('month').toDate(),
                to: moment(currentDate).endOf('month').toDate(),
            }
        break;

        default:
            throw new Error('No Valid time expression');
        break;
    }
}