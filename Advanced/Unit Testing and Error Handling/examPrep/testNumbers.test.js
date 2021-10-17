const {expect, assert} = require('chai');
const {testNumbers} = require('./testNumbers');

describe('Tests testNumbers',  () => {
    describe("test sumNumbers", () => {



        it("valid parameters should return sum rounded to second number after decimal point", () => {
                expect(testNumbers.sumNumbers(1,1)).to.equal('2.00');
                expect(testNumbers.sumNumbers(2,1)).to.equal('3.00');
        });
        it("check whit floating should return sum rounded to second number after decimal point", () => {
            expect(testNumbers.sumNumbers(1.1111,1)).to.equal('2.11');
            expect(testNumbers.sumNumbers(2.2,1.1)).to.equal('3.30');
            expect(testNumbers.sumNumbers(2.2,-1.1)).to.equal('1.10');
            expect(testNumbers.sumNumbers(1.555,1.333)).to.equal('2.89');
        });
        it("check whit negative should return sum rounded to second number after decimal point", () => {
            expect(testNumbers.sumNumbers(-1,-1)).to.equal('-2.00');
            expect(testNumbers.sumNumbers(-2,1)).to.equal('-1.00');
        });
        it("check whit positive and negative should return sum rounded to second number after decimal point", () => {
            expect(testNumbers.sumNumbers(-2,1)).to.equal('-1.00');
            expect(testNumbers.sumNumbers(2,-1)).to.equal('1.00');
        });
        it("check whit invalid parameter should return undefined", () => {
            expect(testNumbers.sumNumbers('1',1)).to.be.undefined;
            expect(testNumbers.sumNumbers(2,'-1')).to.be.undefined;
            expect(testNumbers.sumNumbers(2,'a')).to.be.undefined;
            expect(testNumbers.sumNumbers('1','1')).to.be.undefined;
            expect(testNumbers.sumNumbers()).to.be.undefined;
            expect(testNumbers.sumNumbers(1)).to.be.undefined;
        });
        it("check whit no parameters should return undefined", () => {
            expect(testNumbers.sumNumbers()).to.be.undefined;
            expect(testNumbers.sumNumbers(1)).to.be.undefined;
        });
        it("check whit one parameters should return undefined", () => {

            expect(testNumbers.sumNumbers(1)).to.be.undefined;
        });
    });
    describe("test numberChecker", () => {


        it('if given even num returns message "The number is even!"', () => {
            expect(testNumbers.numberChecker(2)).to.equal('The number is even!');
            expect(testNumbers.numberChecker(4)).to.equal('The number is even!');
            expect(testNumbers.numberChecker(6)).to.equal('The number is even!');
            assert(testNumbers.numberChecker(2), 'The number is even!');
        });

        it('if given odd num returns message "The number is odd!"', () => {
            expect(testNumbers.numberChecker(1)).to.equal('The number is odd!');
            expect(testNumbers.numberChecker(3)).to.equal('The number is odd!');
            expect(testNumbers.numberChecker(5)).to.equal('The number is odd!');
            assert(testNumbers.numberChecker(1), 'The number is odd!');
        });
        it('if given num as str should parse it and validates it', () => {
            expect(testNumbers.numberChecker('1')).to.equal('The number is odd!');
            expect(testNumbers.numberChecker('3')).to.equal('The number is odd!');
            expect(testNumbers.numberChecker('2')).to.equal('The number is even!');
            expect(testNumbers.numberChecker('4')).to.equal('The number is even!');
        });
        it('if given not a number should raise "The input is not a number!"', () => {
            expect(() => testNumbers.numberChecker('abc')).to.throw('The input is not a number!');
            expect(() => testNumbers.numberChecker({})).to.throw('The input is not a number!');

        });
    });
    describe("test averageSumArray", () => {

        it('when given arr of nums should return avgSum', () => {
            expect(testNumbers.averageSumArray([2,2,2])).to.equal(2);
            expect(testNumbers.averageSumArray([1,2,3])).to.equal(2);
        });
        it('when given empty arr should return 0', () => {
            expect(testNumbers.averageSumArray([])).to.be.NaN

        });
        it('when given empty arr should return 0', () => {
            expect(testNumbers.averageSumArray([])).to.be.NaN

        });
    });
});
