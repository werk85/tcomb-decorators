/* eslint no-new: 0 */
import expect from 'expect';
import { String as Str } from 'tcomb';

import { func, struct } from '../src';

describe('tcomb-decorators', function () {
  describe('func', function () {
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

  describe('struct', function () {
    @struct({
      name: Str
    })
    class TestClass {
      constructor(name) {
        this.name = name;
      }
    }

    it('should create a valid object', function () {
      expect(function () {
        new TestClass('test');
      }).toNotThrow();
    });

    it('should throw an error on invalid initialisation', function () {
      expect(function () {
        new TestClass();
      }).toThrow(/Invalid initialisation/);
    });

    describe('production', function () {
      let nodeEnv;

      beforeEach(function () {
        nodeEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';
      });

      afterEach(function () {
        process.env.NODE_ENV = nodeEnv;
      });

      it('should not throw on invalid initialisation', function () {
        expect(function () {
          new TestClass();
        }).toNotThrow();
      });
    });
  });
});
