import { func } from 'tcomb';

export default function (domain, codomain) {
  return function (target, name, descriptor) {
    return {
      ...descriptor,
      value: func(domain, codomain, name).of(descriptor.value)
    };
  };
}
