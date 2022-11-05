// only works on one level of nesting?
export const updateObject = (
  oldObject: Object,
  updatedProperties: Object
) => ({
  ...oldObject,
  ...updatedProperties
});