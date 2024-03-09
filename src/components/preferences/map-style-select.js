import { Fragment, useMemo } from 'react'
import {
  Avatar,
  ListItemContent,
  ListItemDecorator,
  Option,
  Select,
} from '@mui/joy'
import { useAppContext } from '@context'

export const MapStyleSelect = () => {
  const { preferences } = useAppContext()

  const options = useMemo(() => [
    { key: 'min',      label: 'Minimal',    baseMap: `${ preferences.mapStyle.getBaseMap('min') }` },
    { key: 'nav',      label: 'Navigation', baseMap: `${ preferences.mapStyle.getBaseMap('nav') }` },
    { key: 'outdoors', label: 'Outdoors',   baseMap: `${ preferences.mapStyle.getBaseMap('outdoors') }` },
    { key: 'sat',      label: 'Satellite',  baseMap: `${ preferences.mapStyle.getBaseMap('sat') }` },
  ], [preferences.colorMode])

  const handleChange = (event, newValue) => {
    preferences.mapStyle.set(newValue)
  }

  return (
    <Select
      value={ preferences.mapStyle.current }
      onChange={ handleChange }
      renderValue={
        option => (
          <Fragment>
            <ListItemDecorator>
              <Avatar
                size="sm"
                src={ preferences.mapStyle.baseMapThumbnail }
                sx={{ borderRadius: '15%' }}
              />
            </ListItemDecorator>
            <ListItemContent>{ option.label }</ListItemContent>
          </Fragment>
        )
      }
    >
      {
        options.map(option => {
          return (
            <Option
              key={ option.key }
              value={ option.key }
            >
              <ListItemDecorator>
                <Avatar
                  size="sm"
                  src={ preferences.mapStyle.getBaseMapThumbnail(option.baseMap) }
                  sx={{ borderRadius: '15%' }}
                />
              </ListItemDecorator>
              <ListItemContent>{ option.label }</ListItemContent>
            </Option>
          )
        })
      }
    </Select>
  )
}