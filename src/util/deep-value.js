export const deepValue = (obj, path) => path
  .split('.')
  .reduce((_obj, key) => {
    return (_obj && typeof _obj[key] !== 'undefined')
      ? _obj[key]
      : undefined
  }, obj)

