import {sqlTimestampToDate, dateToSqlTimestamp} from './sqlTimeParsing'



describe('sqlTimeToDate', () => {
     it('should return the correct values', () => {
        const examples = [
            ['2008-11-11 13:23:44', new Date('11 Nov 2008 13:23:44 GMT')],
            ['1970-01-01 00:00:00', new Date('01 Jan 1970 00:00:00 GMT')],
            ['2016-02-29 10:20:30', new Date('29 Feb 2016 10:20:30 GMT')],    
        ]

        examples.forEach(data => {
            expect(sqlTimestampToDate(data[0]).toUTCString()).toEqual(data[1].toUTCString());
        })
    })

    it('should throw an error if the input is invalid', () => {
        const failingExamples = [
            '#2008-11-11 13:23:44', // (Prefixed sharp)
            '2008 11 11 13:23:44', // (No dashes)
        ]

        failingExamples.forEach(data => {
            expect(()=>{
                let date = sqlTimestampToDate(data);
            }).toThrow();
        })
    })
})

describe('dateToSqlTimestamp', () => {
    it('should return empty string if it received null or undefined', () => {
        expect(dateToSqlTimestamp(null)).toEqual('');
        expect(dateToSqlTimestamp(undefined)).toEqual('');
    })

    it('should return the correct values', () => {
        const examples = [
            [new Date('11 Nov 2008 13:23:44 GMT'), '2008-11-11 13:23:44'],
            [new Date('01 Jan 1970 00:00:00 GMT'), '1970-01-01 00:00:00'],
            [new Date('29 Feb 2016 10:20:30 GMT'), '2016-02-29 10:20:30'],    
        ]

        examples.forEach(data => {
            expect(dateToSqlTimestamp(data[0])).toEqual(data[1]);
        })
    })
})
