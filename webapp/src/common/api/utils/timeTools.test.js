import {parseTimeExpression, timeExpressions} from './timeTools'


describe('parseTimeExpression', () => {

    it('should return right for `tomorrow`', () => {
        const examples = [
            [new Date('20 Mar 2018 13:23:44 GMT'), new Date('20 Mar 2018 23:00:00 GMT'), new Date('21 Mar 2018 22:59:59 GMT')]
        ]

        examples.forEach(value => {
            expect(parseTimeExpression('tomorrow', value[0], 'de').from.toUTCString()).toEqual(value[1].toUTCString());
            expect(parseTimeExpression('tomorrow', value[0], 'de').to.toUTCString()).toEqual(value[2].toUTCString());            
        })
    })

    // it('should return right for `week`', () => {
    //     const examples = [
    //         [new Date('20 Mar 2018 13:23:44 GMT'), new Date('20 Mar 2018 13:23:44 GMT'), new Date('25 Mar 2018 22:59:59 GMT')]
    //     ]

    //     examples.forEach(value => {
    //         expect(parseTimeExpression('week', value[0], 'de').from.toUTCString()).toEqual(value[1].toUTCString());
    //         expect(parseTimeExpression('week', value[0], 'de').to.toUTCString()).toEqual(value[2].toUTCString());            
    //     })
    // })

    // it('should return right for `weekend`', () => {
    //     const examples = [
    //         [new Date('20 Mar 2018 13:23:44 GMT'), new Date('23 Mar 2018 23:00:00 GMT'), new Date('25 Mar 2018 23:59:59 GMT')]
    //     ]

    //     examples.forEach(value => {
    //         expect(parseTimeExpression('weekend', value[0], 'de').from.toUTCString()).toEqual(value[1].toUTCString());
    //         expect(parseTimeExpression('weekend', value[0], 'de').to.toUTCString()).toEqual(value[2].toUTCString());            
    //     })
    // })

    // it('should return right for `month`', () => {
    //     const examples = [
    //         [new Date('20 Mar 2018 13:23:44 GMT'), new Date('28 Feb 2018 23:00:00 GMT'), new Date('31 Mar 2018 22:59:59 GMT')]
    //     ]

    //     examples.forEach(value => {
    //         expect(parseTimeExpression('month', value[0], 'de').from.toUTCString()).toEqual(value[1].toUTCString());
    //         expect(parseTimeExpression('month', value[0], 'de').to.toUTCString()).toEqual(value[2].toUTCString());            
    //     })
    // })
})