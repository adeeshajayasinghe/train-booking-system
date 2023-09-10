const config = require('../../../startup/config');

describe('config', () => {
  it('should throw an error if jwtPrivateKey is not defined', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => {config.checkConfig(a)}).toThrow();
    });
  });
});