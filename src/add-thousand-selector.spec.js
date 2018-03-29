const expect = require('chai').expect;

const addThousandSelector = require('./add-thousand-selector');

describe('The addThousandSelector function', () => {
    it('should work', () => {
        expect(addThousandSelector("5000")).to.equal("5,000");
    })
})