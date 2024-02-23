import { Divider, Typography } from '@mui/joy'
import { ContentPage } from '@components/layout'
import { ContactForm } from '@components/contact-form'

export const ContactView = () => {
  return (
    <ContentPage maxWidth="sm">
      <Typography level="h1">Contact</Typography>

      <br />

      <Typography variant="body-md">
        Cupidatat in dolore id tempor ad amet voluptate reprehenderit eiusmod fugiat officia laboris.
        Incididunt fugiat voluptate sint labore ut proident dolor ullamco aliquip eu ut sunt deserunt dolor in.
        Lorem ipsum non dolore occaecat veniam consectetur consequat eiusmod irure laboris ut exercitation laboris dolor elit veniam voluptate non dolor.
      </Typography>

      <br />

      <Divider />

      <br />

      <ContactForm />
    </ContentPage>
  )
}