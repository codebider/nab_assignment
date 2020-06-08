const mapper = require('./mapper');

describe('test mapper function', () => {
    it('return correct object', () => {
        const result = mapper(
            {
                firstName: 'Daniel',
                lastName: 'Le',
                phoneNumber: '1234576',
                address: 'Cong Hoa, HCM',
                email: '',
                amount: 0,
                link: null,
                facebook: undefined,
            },
            ['firstName', 'lastName', 'mobile', 'city', 'email', 'amount', 'link', 'facebook'],
            {
                mobile: 'phoneNumber',
            },
            {
                city: 'HCM',
                amount: 10,
            },
        );

        expect(result).toEqual({
            firstName: 'Daniel',
            lastName: 'Le',
            mobile: '1234576',
            city: 'HCM',
            email: '',
            amount: 0,
            link: null,
            facebook: undefined,
        });
    });

    it('should return special value first', () => {
        const result = mapper(
            {
                firstName: 'Daniel',
                lastName: 'Le',
                phoneNumber: '1234576',
                address: 'Cong Hoa, HCM',
                email: '',
                amount: 0,
                link: null,
                facebook: undefined,
                url: 'http:localhost',
            },
            ['firstName', 'lastName', 'mobile', 'city', 'email', 'amount', 'link', 'facebook', 'url'],
            {
                mobile: 'phoneNumber',
                url: 'lastName',
            },
            {
                city: 'HCM',
                amount: 10,
            },
        );

        expect(result).toEqual({
            firstName: 'Daniel',
            lastName: 'Le',
            mobile: '1234576',
            city: 'HCM',
            email: '',
            amount: 0,
            link: null,
            facebook: undefined,
            url: 'Le',
        });
    });
});
