const {expect, assert} = require('chai')
const {createCalculator} = require('../addSubtract')


describe('tests createCalculator', () => {
    let instanceCalculator = null;

    beforeEach(() => {
        instanceCalculator = createCalculator();
    })

    it('has all properties', () => {
        expect(instanceCalculator).to.has.ownProperty('add');
        expect(instanceCalculator).to.has.ownProperty('subtract');
        expect(instanceCalculator).to.has.ownProperty('get');
    });
    it('start empty', () => {
        expect(instanceCalculator.get()).to.equal(0);
    })
    it('adds number to internal sum', () => {
        instanceCalculator.add(1);
        expect(instanceCalculator.get()).to.equal(1);
        instanceCalculator.add(1);
        expect(instanceCalculator.get()).to.equal(2);

    });
    it('adds string number to internal sum', () => {
        instanceCalculator.add('1');
        expect(instanceCalculator.get()).to.equal(1);
        instanceCalculator.add('1');
        expect(instanceCalculator.get()).to.equal(2);
    });

    it('adds incorrect Value to internal sum returns Nan', () => {
        instanceCalculator.add('test');
        expect(instanceCalculator.get()).to.be.NaN;
    });

    it('subtract number to internal sum', () => {
        instanceCalculator.add(2);
        instanceCalculator.subtract(1);
        expect(instanceCalculator.get()).to.equal(1);
    });
    it('subtract string number to internal sum', () => {
        instanceCalculator.add(2);
        instanceCalculator.subtract('1');
        expect(instanceCalculator.get()).to.equal(1);
    });
    it('subtract incorrect Value to internal sum returns Nan', () => {
        instanceCalculator.subtract('test');
        expect(instanceCalculator.get()).to.be.NaN;
    });
    it('get() returns internal value', () =>{
        instanceCalculator.add(1);
        expect(instanceCalculator.get()).to.equal(1);
    })
});