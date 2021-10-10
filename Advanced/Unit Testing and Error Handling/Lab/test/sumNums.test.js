const {expect, assert} = require('chai');
const {sum} = require('../../sumNums');


describe('test sumNums', () => {
    it('works with 1 and 2', () => {
        assert.equal(sum([1, 2]), 3)
    })

    it('Takes array as argument if not raises', () => {
        expect(() => sum(1,2)).to.throw(TypeError)
    })
})