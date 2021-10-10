const {expect} = require('chai');
const {isOddOrEven} = require('./isOddOrEven');


describe('testing isOddOrEven', () => {
    it('should return even when length of string is even', () => {
        expect(isOddOrEven('1234')).to.equal('even');
    });
    it('should return odd when length of string is odd', () => {
        expect(isOddOrEven('12344')).to.equal('odd');
    });
    it('should return even when empty string', () => {
        expect(isOddOrEven('')).to.equal('even');
    });

    it('when invalid input should return undefined', () => {
        expect(isOddOrEven(1)).to.undefined;
        expect(isOddOrEven([1,1])).to.undefined;
        expect(isOddOrEven({})).to.undefined;
    });
})