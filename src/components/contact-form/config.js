import * as yup from 'yup'

//

export const FORM_URL = `https://tbd`

//

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name.'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Please enter an email address'),
  subject: yup
    .string()
    .required('Please briefly describe the nature of your message.'),
  message: yup
    .string()
    .required('Please enter a message.'),
})

//

export const defaults = {
  name: '',
  email: '',
  subject: '',
  message: '',
}