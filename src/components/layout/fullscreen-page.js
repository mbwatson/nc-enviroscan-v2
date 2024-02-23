import PropTypes from 'prop-types'
import { Box } from '@mui/joy'

export const FullscreenPage = ({ children, sx = {} }) => {
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      ...sx,
    }}>
      { children }
    </Box>
  )
}

FullscreenPage.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
}
