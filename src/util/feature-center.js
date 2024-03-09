export const featureCenter = coordinates => {
  const extrema = coordinates
    .reduce((acc, [lng, lat]) => {
      if (lng < acc.lng.min) { acc.lng.min = lng }
      if (lng > acc.lng.max) { acc.lng.max = lng }
      if (lat < acc.lat.min) { acc.lat.min = lat }
      if (lat > acc.lat.max) { acc.lat.max = lat }
      return acc
    }, { lat: { min: Infinity, max: -Infinity }, lng: { min: Infinity, max: -Infinity } })
  const longitude = (extrema.lng.min + extrema.lng.max) / 2
  const latitude = (extrema.lat.min + extrema.lat.max) / 2
  return { longitude, latitude }
}
