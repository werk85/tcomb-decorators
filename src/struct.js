import { assert, struct, validate } from 'tcomb-validation';

export default function (props) {
  return function (target) {
    const instance = struct(props, target.name);
    function Struct(...args) {
      target.call(this, ...args);
      if (process.env.NODE_ENV !== 'production') {
        const { errors } = validate(this, instance);
        assert(errors.length === 0, function () {
          return 'Invalid initialisation';
        });
      }
    }

    Struct.prototype = Object.create(target.prototype);

    return Struct;
  };
}
