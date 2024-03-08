import { useData } from '@context'
import { PointLayer } from './'


export const id = `non-public-schools`

export const name = 'Non-public Schools'

export const Component = () => {
  const { layerData } = useData()

  return (
    <PointLayer
      source={ id }
      data={ layerData[id].data }
      paint={{
        'circle-color': '#bc7a00',
        'circle-stroke-color': '#9c4a00',
      }}
    />
  )
}
