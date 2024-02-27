import { useData } from '@context'
import { PointLayer } from './'

export const SuperfundSitesLayer = () => {
  const { superfundSites } = useData()

  return (
    <PointLayer
      source="superfund-sites"
      data={ superfundSites }
      paint={{
        'circle-color': '#8530eb',
        'circle-stroke-color': '#330099',
        'circle-radius': 6,
      }}
    />
  )
}
