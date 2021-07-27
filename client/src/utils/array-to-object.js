export default (arr, key) => {
  const result = {}
  arr.forEach(item => {
    result[item[key]] = item
  })
  return result
}