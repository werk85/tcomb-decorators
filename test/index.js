import expect from 'expect';
import { String as Str } from 'tcomb';

import { func } from '../src';

class TestClass {
  @func([Str], Str)
  valid(value) {
    return value;
  }

  @func([Str], Str)
  invalid(value) {
    return !!value;
  }
}

describe('tcomb-decorators', function () {
  describe('func', function () {
    let obj;

    beforeEach(function () {
      obj = new TestClass();
    });

    it('should return valid value on valid parameters', function () {
      expect(obj.valid('test')).toEqual('test');
    });

    it('should throw an error on invalid parameters', function () {
      expect(obj.invalid).withArgs(null).toThrow();
    });

    it('should throw an error on invalid return type', function () {
      expect(obj.invalid).withArgs('test').toThrow();
    });
  });
});
