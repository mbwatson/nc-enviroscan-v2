import PropTypes from 'prop-types'
import {
  FormControl, FormLabel, FormHelperText, Input, Textarea,
} from '@mui/joy'
import { useFormContext } from 'react-hook-form'

//

export const NameField = () => {
  const { formState, register } = useFormContext()
  return (
    <FormControl>
      <FormLabel>Name</FormLabel>
      <Input
        name="name"
        label="Name"
        variant="outlined"
        { ...register('name') }
        error={ !!formState.errors.name }
      />
      {
        'name' in formState.errors && <FormHelperText>{ formState.errors.name.message }</FormHelperText>
      }
    </FormControl>
  )
}

//

export const EmailField = () => {
  const { formState, register } = useFormContext()
  return (
    <FormControl>
      <FormLabel>Your email</FormLabel>
      <Input
        name="email"
        label="Email"
        variant="outlined"
        { ...register('email') }
        error={ !!formState.errors.email }
      />
      {
        'email' in formState.errors && <FormHelperText>{ formState.errors.email.message }</FormHelperText>
      }
    </FormControl>
  )
}

//

export const SubjectField = () => {
  const { formState, register } = useFormContext()
  return (
    <FormControl>
      <FormLabel>Subject</FormLabel>
      <Input
        name="subject"
        label="Subject"
        variant="outlined"
        { ...register('subject') }
        error={ !!formState.errors.subject }
      />
      {
        'subject' in formState.errors && <FormHelperText>{ formState.errors.subject.message }</FormHelperText>
      }
    </FormControl>
  )
}

//

export const MessageField = () => {
  const { formState, register } = useFormContext()
  return (
    <FormControl>
      <FormLabel>Message</FormLabel>
      <Textarea
        name="message"
        label="Message"
        variant="outlined"
        { ...register('message') }
        error={ !!formState.errors.message }
        minRows={ 5 }
      />
      {
        'message' in formState.errors && <FormHelperText>{ formState.errors.message.message }</FormHelperText>
      }
    </FormControl>
  )
}

//

export const TokenField = ({ value }) => {
  return (
    <input
      type="hidden"
      name="token"
      value={ value }
    />
  )
}

TokenField.propTypes = {
  value: PropTypes.string.isRequired,
}
