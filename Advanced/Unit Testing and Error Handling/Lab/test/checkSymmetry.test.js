const {expect, assert} = require('chai');
const {isSymmetric} = require('../checkSymmetry');


describe('test isSymmetric', () =>{
    it('returns true if arr is symmetric', () =>{
        expect(isSymmetric([2,1,2,2,1,2])).to.be.true;
    })
    it('if not symmetric returns false', () =>{
        expect(isSymmetric([1,2,3])).to.be.false;
    })
    it('if not array but a number returns false', () =>{
        expect(isSymmetric(1)).to.be.false;
    })
    it('if not array but a string returns false', () =>{
        expect(isSymmetric('notArray')).to.be.false;
    })
    it('if not all elements in the array are numbers returns false', () =>{
        expect(isSymmetric([1, '2', 2, 1])).to.be.false;
    })
})