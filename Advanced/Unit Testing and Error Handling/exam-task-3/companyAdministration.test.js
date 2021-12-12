const {expect, assert} = require('chai');
const {companyAdministration} = require('./companyAdministration');

describe('Tests companyAdministration', () => {
    describe("test hiringEmployee", () => {

        it('test different position should raise', () => {
            expect(() => companyAdministration.hiringEmployee('TestName', 'HR', 5)).to.throw(`We are not looking for workers for this position.`)
        });
        it('test experience less than 3years should return msg', () => {
            expect(companyAdministration.hiringEmployee('TestName', 'Programmer', 2)).to.equal(`TestName is not approved for this position.`)
        });
        it('test experience eql 3years should return msg', () => {
            expect(companyAdministration.hiringEmployee('TestName', 'Programmer', 3)).to.equal(`TestName was successfully hired for the position Programmer.`)
        });
        it('test experience more than 3years should return msg', () => {
            expect(companyAdministration.hiringEmployee('TestName', 'Programmer', 4)).to.equal(`TestName was successfully hired for the position Programmer.`)
        });


    });
    describe("test calculateSalary", () => {


        it('test input is negative Number should raise', () => {
            expect(() => companyAdministration.calculateSalary(-1)).to.throw('Invalid hours')
        });
        it('test input is not a Number should raise', () => {
            expect(() => companyAdministration.calculateSalary('20')).to.throw('Invalid hours')
            expect(() => companyAdministration.calculateSalary('abc')).to.throw('Invalid hours')
            expect(() => companyAdministration.calculateSalary([100])).to.throw('Invalid hours')
        });
        it('test calculating salary less than 160 hours, no bonus', () => {
            expect(companyAdministration.calculateSalary(100)).to.equal(1500);
        });
        it('test calculating salary eql 160 hours , no bonus', () => {
            expect(companyAdministration.calculateSalary(160)).to.equal(2400);
        });
        it('test calculating salary more than 160 hours get the bonus', () => {
            expect(companyAdministration.calculateSalary(161)).to.equal(3415);
        });


    });
    describe("test firedEmployee", () => {

        it('test first input if not arr should raise', () => {
            expect(() => companyAdministration.firedEmployee('Ivan, Pesho', 1)).to.throw('Invalid input')
            expect(() => companyAdministration.firedEmployee({}, 1)).to.throw('Invalid input')
            expect(() => companyAdministration.firedEmployee(2, 1)).to.throw('Invalid input')
        });
        it('test second input if index not a number should raise', () => {
            expect(() => companyAdministration.firedEmployee(['Ivan', 'Pesho'], '1')).to.throw('Invalid input')
        });
        it('test second input if index is negative number should raise', () => {
            expect(() => companyAdministration.firedEmployee(['Ivan', 'Pesho'], -1)).to.throw('Invalid input')
            expect(() => companyAdministration.firedEmployee(['Ivan', 'Pesho', 'Nora'], -2)).to.throw('Invalid input')
        });
        it('test second input if index out of range should raise', () => {
            expect(() => companyAdministration.firedEmployee(['Ivan', 'Pesho', 'Nora'], 3)).to.throw('Invalid input')
            expect(() => companyAdministration.firedEmployee(['Ivan', 'Pesho', 'Nora'], 4)).to.throw('Invalid input')
        });

        it('test removes the employee', () => {
            expect(companyAdministration.firedEmployee(['Ivan', 'Pesho', 'Nora'], 1)).to.equal('Ivan, Nora')
        });

        it('test returns the arr without the employee', () => {
            expect(companyAdministration.firedEmployee(['Ivan', 'Pesho', 'Nora'], 1)).to.equal('Ivan, Nora')
        });


    });
});
