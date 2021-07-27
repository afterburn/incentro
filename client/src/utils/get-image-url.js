export default (images) => {
  if (images.length === 0) {
    return '/not-found.webp'
  }
  return images[0].url
}