import { Sheet, Typography } from '@mui/joy'
import PropTypes from 'prop-types'
import { useAppContext } from '@context'

//

export const Thanks = ({ show = false }) => {
  const { preferences } = useAppContext()

  if (!show) {
    return
  }
  
  return (
    <Sheet sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: '1rem',
      top: '1rem',
      right: '1rem',
      bottom: '1rem',
      filter: 'opacity(0.9)',
      zIndex: 9,
      gap: 4,
      borderRadius: 'md',
      backgroundColor: preferences.colorMode.light ? 'primary.100' : 'primaryDark.700',
    }}>
      <Typography level="h3" color="primary">Thanks!</Typography>
      <Typography paragraph>
        Your message has been sent. We&apos;ll be in touch soon.
      </Typography>
    </Sheet>
  )
}

Thanks.propTypes = {
  show: PropTypes.bool.isRequired,
}

