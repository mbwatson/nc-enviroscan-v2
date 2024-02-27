import { useData } from '@context'
import { PointLayer } from './'

export const id = `superfund-sites`

export const name = 'Superfund Sites'

export const Component = () => {
  const { superfundSites } = useData()

  return (
    <PointLayer
      source={ id }
      data={ superfundSites }
      paint={{
        'circle-color': '#8530eb',
        'circle-stroke-color': '#330099',
        'circle-radius': 6,
      }}
    />
  )
}

