import {deepmerge} from './deepMerge';

// merge an object
function merge(acc: Object, item: unknown) {
  if (!item) {
    return acc;
  }

  return deepmerge(acc, item, {
    clone: false, // No need to clone deep, it's way faster.
  });
}

export default merge;
