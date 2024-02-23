import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Stack } from '@mui/joy'
import {
  Check as CheckIcon,
  Refresh as ResetIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, defaults } from './config'
import { NameField, EmailField, SubjectField, TokenField, MessageField } from './fields'
import { Thanks } from './thanks'

/*
 * Basic Contact Form
 *
 * @presets: used to auto-populate the form on initial render
 *
 * for example, we may want to declaratively navigate users to
 * the feedback view that contains this form, with the form
 * ready to send us a bug report.
 *
 *   navigate('/feedback', { state: {
 *     subject: 'bug',
 *     message: `This thing broke!`
 *   } }),
 *
 * where `navigate` is from react-rotuer-dom.
 * notice how this passed-in data overwrites the default object data.
 */
export const ContactForm = ({ presets }) => {
  const [showThanks, setShowThanks] = useState(false)
  const formRef = useRef(null)
  const token = useRef('')
  const methods = useForm({
    schema,
    resolver: yupResolver(schema),
    defaultValues: { ...defaults, ...presets },
  })
  const {
    handleSubmit,
    formState: {
      isSubmitting,
      isSubmitSuccessful,
    },
    reset,
    setFocus,
  } = methods

  /*
   * start user's cursor in first field on initial render.
   */
  useEffect(() => {
    setFocus('name')
  }, [])

  /*
   * user-requested form-clearing:
   * - reset fields to defaults,
   * - remove "thank you" message,
   */
  const handleClickClearForm = () => {
    reset(defaults)
    setShowThanks(false)
  }

  /*
   * the actual message-sending function,
   * which gets wrapped with react-hook-form's `handleSubmit`.
   */
  const submitHandler = useCallback(() => {
    setShowThanks(true)
  }, [])

  return (
    <FormProvider { ...methods }>
      <Box sx={{ display: 'flex', position: 'relative' }}>

        <Stack
          component="form"
          ref={ formRef }
          spacing={ 4 }
          sx={{ width: '100%', mt: 1, mb: 2 }}
        >
          <Stack direction="row" gap={ 4 } sx={{
            '.MuiFormControl-root': { flex: 1 }
          }}>
            <NameField />
            <EmailField />
          </Stack>
          <SubjectField />
          <MessageField />
          <TokenField value={ token.current } />
        </Stack>

        <Thanks show={ showThanks } />

      </Box>

      <Stack
        direction="row"
        gap={ 4 }
        sx={{
          '& > button': { flex: 1 },
          minWidth: '100%',
          mt: 3, mb: 1,
        }}
      >
        <Button
          onClick={ handleClickClearForm }
          variant="outlined"
          startDecorator={ <ResetIcon /> }
        >Reset</Button>

        <Button
          onClick={ handleSubmit(submitHandler) }
          variant="soft"
          disabled={ isSubmitting || isSubmitSuccessful }
          startDecorator={ showThanks ? <CheckIcon /> : <SendIcon /> }
        >{ showThanks ? 'Submitted!' : 'Send' }</Button>
      </Stack>

    </FormProvider>
  )
}

ContactForm.propTypes = {
  presets: PropTypes.object,
}
