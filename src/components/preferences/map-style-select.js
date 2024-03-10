import { useMemo } from 'react'
import {
  Avatar,
  Box,
  ListItemContent,
  ListItemDecorator,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy'
import { useAppContext } from '@context'

export const MapStyleSelect = () => {
  const { preferences } = useAppContext()

  const styleNames = {
    min: 'Minimal',
    nav: 'Navigation',
    outdoors: 'Outdoors',
    sat: 'Satellite',
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={ 2 }
    >
      <StyleSelect />
      <Box>
        <Typography level="title-md">Map Style</Typography>
        <Typography level="body-xs">{ styleNames[preferences.mapStyle.current] }</Typography>
      </Box>
    </Stack>
  )
}

const StyleSelect = () => {
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
      indicator={ null }
      renderValue={ () => (
        <Avatar
          size="sm"
          src={ preferences.mapStyle.baseMapThumbnail }
          sx={{ borderRadius: '15%' }}
        />
      ) }
      sx={{
        minWidth: '44px',
        maxWidth: '44px',
        height: '44px',
        p: 0,
        '.MuiSelect-button': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
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