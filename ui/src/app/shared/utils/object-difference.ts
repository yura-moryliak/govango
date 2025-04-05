export function getListDifference(
  a: AnyObject[],
  b: AnyObject[],
): { hasDifference: boolean } {
  if (a.length !== b.length) {
    return { hasDifference: true };
  }

  const differences = a
    .map((itemA, index) => {
      const itemB = b[index];
      const diff = getObjectDifference(itemA, itemB);
      return { index, ...diff };
    })
    .filter(({ hasDifference }) => hasDifference);

  return { hasDifference: differences.length > 0 };
}

export function getObjectDifference(
  a: AnyObject,
  b: AnyObject,
): { aToB: AnyObject; bToA: AnyObject; hasDifference: boolean } {
  const aToB = diff(b, a);
  const bToA = diff(a, b);
  return {
    aToB: aToB,
    bToA: bToA,
    hasDifference: Object.keys(aToB).length > 0 || Object.keys(bToA).length > 0,
  };
}

export function patchObject(obj: AnyObject, patch: AnyObject): AnyObject {
  if (Array.isArray(obj) && Array.isArray(patch)) {
    return patch;
  }
  const result = { ...obj };
  Object.entries(patch).forEach(([key, value]) => {
    if (typeof value === 'object') {
      if (value === null) {
        result[key] = null;
      } else {
        result[key] = patchObject(obj[key], value);
      }
    } else {
      result[key] = value;
    }
  });
  return result;
}

type AnyObject = Record<string, any>;

function diff(obj1: AnyObject, obj2: AnyObject): AnyObject {
  if (obj1 === null || obj2 === null) return obj1 === obj2 ? {} : obj1;
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (arraysEqual(obj1, obj2)) {
      return {};
    }
    return obj1;
  }
  return Object.keys(obj1).reduce((acc: AnyObject, key: string) => {
    if (!(key in obj2)) {
      acc[key] = obj1[key]; // Property exists in obj1 but not in obj2
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const nestedDiff = diff(obj1[key], obj2[key]);
      if (
        nestedDiff === null ||
        Object.keys(nestedDiff).length ||
        Array.isArray(nestedDiff)
      )
        acc[key] = nestedDiff;
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = obj1[key]; // Property differs
    }
    return acc;
  }, {});
}

function arraysEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) return false;

  return arr1.every((value, index) => {
    if (Array.isArray(value) && Array.isArray(arr2[index])) {
      return arraysEqual(value, arr2[index]);
    }
    if (value === null || arr2[index] === null) {
      return value === arr2[index];
    }
    if (typeof value === 'object' && typeof arr2[index] === 'object') {
      return (
        Object.keys(getObjectDifference(value, arr2[index]).aToB).length === 0
      );
    }
    return value === arr2[index];
  });
}
