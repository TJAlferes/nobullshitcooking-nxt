// only works on one level of nesting
// TO DO: use structuredClone
export const updateObject = (oldObject: Object, updatedProperties: Object) =>
  ({...oldObject, ...updatedProperties});