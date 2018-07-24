require('../index');
const expect = require('code').expect;

describe('regexp-check', () => {
  describe('polyfill', () => {
    it('adds check to instances defined with /pattern/flags syntax', () => {
      const expression = /12345/giu;
      expect(expression.check).to.exist();
      expect(expression.check).to.be.function();
    });
    it('adds check to instances defined with RegExp(pattern[, flags]) syntax', () => {
      const expression = RegExp('^abcd$', 'muy');
      expect(expression.check).to.exist();
      expect(expression.check).to.be.function();
    });
    it('adds check to instances defined with new RegExp(pattern[, flags]) syntax', () => {
      const expression = new RegExp('12345', 'gi');
      expect(expression.check).to.exist();
      expect(expression.check).to.be.function();
    });
  });
  describe('method behavior', () => {
    describe('global flag', () => {
      it('global instances returns same value when called multiple times', () => {
        const expression = new RegExp('[^0-9]+', 'g');
        [...Array(20).keys()].forEach(() => {
          expect(expression.check('ABCD')).to.be.true();
        });
      });
      it('ignores lastIndex property', () => {
        const expression = new RegExp('tennis', 'g');
        expression.test('tennis ball');
        expect(expression.lastIndex).to.equal(6);

        // .test would have returned false
        expect(expression.check('tennis court')).to.be.true();
      });
    });
    describe('sticky flag', () => {
      it('only searches from lastIndex', () => {
        const expression = new RegExp('a', 'y');
        expression.lastIndex = 5;
        expect(expression.check('abcdefghijkl')).to.be.false();
      });
      it('does not mutate lastIndex', () => {
        const expression = new RegExp('\s{5}', 'y');
        expression.lastIndex = 3;
        expect(expression.check('     ')).to.be.false();
        expect(expression.lastIndex).to.equal(3);
      });
      it('returns the same result when called multiple times', () => {
        const expression = new RegExp('football', 'y');
        expression.lastIndex = 18;
        [...Array(20).keys()].forEach(() => {
          expect(expression.check('areyoureadyforsomefootball'))
            .to.be.true();
        });
      });
    });
  });
});