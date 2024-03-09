export const title = useMemo(() => {
  if (!activeRegion.current) {
    return '...'
  }
  if (activeRegion.current.layer.source === 'counties') {
    return `${ activeRegion.current.properties.CountyName } County`
  }
  if (activeRegion.current.layer.source === 'census-tracts') {
    return activeRegion.current.properties.NAMELSAD
  }
}, [activeRegion.current])
