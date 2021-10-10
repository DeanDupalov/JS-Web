const {expect, assert} = require('chai');
const {rgbToHexColor} = require('../rgbToHex');

//
describe('tests rgbToHexColor', () => {
    it('convert white', () => {
        const actual = rgbToHexColor(255, 255, 255);
        const expected = '#FFFFFF'
        assert.equal(actual, expected);
    });

    it('converts black', () =>{
        expect(rgbToHexColor(0,0,0)).to.equal('#000000');
    });

    it('converts red', () => {
        const actual = rgbToHexColor(255, 0, 0);
        const expected = '#FF0000'
        assert.equal(actual, expected);
    });
    it('converts blue', () => {
        const actual = rgbToHexColor(0, 0, 255);
        const expected = '#0000FF'
        assert.equal(actual, expected);
    });
    it('returns undefined if not in range', () =>{
        expect(rgbToHexColor(256,256,256)).to.be.undefined;
        expect(rgbToHexColor(256,0,0)).to.be.undefined;
        expect(rgbToHexColor(0,256,0)).to.be.undefined;
        expect(rgbToHexColor(0,0,256)).to.be.undefined;

    });
    it('returns undefined if not in range', () => {
        expect(rgbToHexColor(-1, -1, -1)).to.be.undefined;
        expect(rgbToHexColor(-1, 0, 0)).to.be.undefined;
        expect(rgbToHexColor(0, -1, 0)).to.be.undefined;
        expect(rgbToHexColor(0, 0, -1)).to.be.undefined;
    });
    it('returns undefined if not valid type', () =>{
        expect(rgbToHexColor('256',0,0)).to.be.undefined;
        expect(rgbToHexColor(0,'256',0)).to.be.undefined;
        expect(rgbToHexColor(0,0,'256')).to.be.undefined;

    });

});