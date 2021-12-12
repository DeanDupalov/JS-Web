const {expect, assert} = require('chai');
const {dealership} = require('./dealrship');


describe('Tests dealership', () => {


    describe("test newCarCost", () => {
        it('test if you are returning your old car', () => {
            expect(dealership.newCarCost('Audi A4 B8', 20000)).to.equals(5000);

        });

        it('test returning old car should deducted fixed amount', () => {
            expect(dealership.newCarCost('Audi A4 B8', 20000)).to.equals(5000);
            expect(dealership.newCarCost('Audi A6 4K', 20000)).to.equals(0);
            expect(dealership.newCarCost('Audi A8 D5', 25000)).to.equals(0);
            expect(dealership.newCarCost('Audi TT 8J', 14000)).to.equals(0);
        });

        it('test returning old car not in the list should not deducted fixed amount', () => {
            expect(dealership.newCarCost('BMW', 20000)).to.equals(20000);
        });

        // it('test first parameter must be string', () => {
        //     expect(dealership.newCarCost('BMW', 20000)).to.equals(20000);
        // });
        // it('test first parameter is not string should raise', () => {
        //     expect(() => dealership.newCarCost(1, 20000)).to.throw();
        // });
        //
        // it('test second parameter must be number', () => {
        //     expect(dealership.newCarCost('BMW', 20000)).to.equals(20000);
        // });
        // it('test second parameter is not number should raise', () => {
        //     expect(dealership.newCarCost('BMW', 20000)).to.equals(20000);
        // });


    });
    describe('test carEquipment', () => {


        it('test returns an array with all the selected extras', () => {
            let expected = ['one']
            let actual = dealership.carEquipment(['one', 'two'], [0])
            assert.equal(actual[0], expected[0]);
        });

        it('test first parameter is empty arr should return undefined', () => {
            expect(dealership.carEquipment([], [0])[0]).to.be.undefined;
        });

        it('test returns arr', () => {
            let result = dealership.carEquipment(['one', 'two'],[1]);
            let actual = Array.isArray(result)
            let expected = true;
            expect(actual).to.be.equal(expected);
        });

        it('test second parameter is not arr should raise', () => {
            expect(() => dealership.carEquipment(['one', 'two'], 1)).to.throw();
            expect(() => dealership.carEquipment(['one', 'two'], '1')).to.throw();
        });
    });
    describe('test euroCategory', () => {


        it('test gives right discount 5%', () => {
            expect( dealership.euroCategory(5)).to.equal('We have added 5% discount to the final price: 14250.')
        });

        it('test category equal to 4 should have discount and return a msg', () => {
            expect( dealership.euroCategory(4)).to.equal('We have added 5% discount to the final price: 14250.')
        });
        it('test category greater than 4 should have discount and return a msg', () => {
            expect( dealership.euroCategory(5)).to.equal('We have added 5% discount to the final price: 14250.')
        });

        it('test category less than 4 should have no discount and return a msg', () => {
            expect( dealership.euroCategory(1)).to.equal('Your euro category is low, so there is no discount from the final price!')
        });


    });
});
