import {sqlTimestampToDate, DateToSqlTimestamp} from './sqlTimeParsing'

const examples = [
    ['2008-11-11 13:23:44', new Date('11 Nov 2008 13:23:44 GMT')],
    ['1970-01-01 00:00:00', new Date('01 Jan 1970 00:00:00 GMT')],
    ['2016-02-29 10:20:30', new Date('29 Feb 2016 10:20:30 GMT')],    
]

describe('sqlTimeToDate', () => {
    it('should return the correct values', () => {
        examples.forEach(data => {
            expect(sqlTimestampToDate(data[0]).toUTCString()).toEqual(data[1].toUTCString());
        })
    })
})