export default (value, min, max) => {
  let r = value
  if (r > min) r = min
  if (r < max) r = max
  return r
}