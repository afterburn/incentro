// Helper function that maps an array onto an object using a given key.
export default (arr, key) => {
  const result = {}
  arr.forEach(item => {
    result[item[key]] = item
  })
  return result
}