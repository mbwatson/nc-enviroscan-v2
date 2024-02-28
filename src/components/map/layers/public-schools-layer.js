import { useData } from '@context'
import { PointLayer } from './'


export const id = `public-schools`

export const name = 'Public Schools'

export const Component = () => {
  const { layerData } = useData()


  return (
    <PointLayer
      source={ id }
      data={ layerData[id].data }
      paint={{
        'circle-color': '#007abc',
        'circle-stroke-color': '#003a8c',
      }}
    />
  )
}
