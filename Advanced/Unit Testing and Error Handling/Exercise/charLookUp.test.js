const {expect} = require('chai');
const {lookupChar} = require('./charLookUp');

describe('testing lookupChar', () => {
    it('valid parameters returns char at given index', function () {
        expect(lookupChar('abc', 0)).to.equal('a');
        expect(lookupChar('abc', 1)).to.equal('b');
    });
    it('first parameter not string returns undefined', function () {
        expect(lookupChar([], 0)).to.be.undefined;
        expect(lookupChar({}, 0)).to.be.undefined;
        expect(lookupChar(1, 0)).to.be.undefined;
    });
    it('second parameter not int returns undefined', function () {
        expect(lookupChar('abc', '0')).to.be.undefined;
        expect(lookupChar('abc', '1')).to.be.undefined;
        expect(lookupChar('abc', [])).to.be.undefined;
        expect(lookupChar('abc', 1.5)).to.be.undefined;
    });
    it('second parameter is negative integer returns "Incorrect index"', function () {
        expect(lookupChar('abc', -1)).to.be.equal('Incorrect index');
        expect(lookupChar('abc', -2)).to.be.equal('Incorrect index');
    });
    it('second parameter out of range returns "Incorrect index"', function () {
        expect(lookupChar('abc', 999)).to.be.equal('Incorrect index');
        expect(lookupChar('abc', 3)).to.be.equal('Incorrect index');
    });
    it('if empty string given returns "Incorrect index"', function () {
        expect(lookupChar('', 0)).to.be.equal('Incorrect index');
    });
})