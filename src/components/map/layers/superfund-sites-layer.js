import { useData } from '@context'
import { PointLayer } from './'

export const id = `superfund-sites`

export const name = 'Superfund Sites'

export const Component = () => {
  const { layerData } = useData()


  return (
    <PointLayer
      source={ id }
      data={ layerData[id].data }
      paint={{
        'circle-color': '#8530eb',
        'circle-stroke-color': '#330099',
        'circle-radius': 6,
      }}
    />
  )
}
