import { useMemo } from 'react'
import { Option, Select } from '@mui/joy'
import { useAppContext, useMap } from '@context'

export const MapStyleSelect = () => {
  const { preferences } = useAppContext()
  const { mapStyle } = useMap()

  // !! room for improvement !! //
  // these need to match options defined
  // in `getBaseMap` of MapContext.
  const options = useMemo(() => [
    { key: 'min',      label: 'Minimal' },
    { key: 'nav',      label: 'Navigation' },
    { key: 'outdoors', label: 'Outdoors' },
    { key: 'sat',      label: 'Satellite' },
], [preferences.colorMode])

  const handleChange = (event, newValue) => {
    mapStyle.set(newValue)
  }

  return (
    <Select
      value={ mapStyle.current }
      onChange={ handleChange }
    >
      {
        options.map(option => (
          <Option
            key={ option.key }
            value={ option.key }
          >{ option.label }</Option>
        ))
      }
    </Select>
  )
}