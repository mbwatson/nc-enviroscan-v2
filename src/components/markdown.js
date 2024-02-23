import {
  Box,
  Typography,
} from '@mui/joy'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from './link'
import { useAppContext } from '@context'

const Paragraph = props => {
  return (
    <Typography
      variant="body-md"
      sx={{
        my: 2,
        'strong': {
          fontWeight: 'bold',
        }
      }}
      { ... props }
    />
  )
}

const Blockquote = props => {
  return (
    <Box
      component="blockquote"
      sx={{
        borderLeft: '16px solid #eee',
        ml: 1,
        pl: 2,
      }}
      { ... props }
    />
  )
}

const Codeblock = props => {
  const { preferences } = useAppContext()
  return (
    <Box
      component="pre"
      sx={{
        border: '1px solid',
        borderColor: preferences.colorMode.light ? '#0004' : '#fff4',
        backgroundColor: preferences.colorMode.light ? '#0002' : '#fff2',
        borderRadius: 'sm',
        fontSize: '80%',
        p: 1,
      }}
      { ... props }
    />
  )
}

/*
 * this object defines a map,
 *   DOM elements -> React components,
 * which allows us to map the HTML elements
 * that result from the markdown content
 * to the React components used in the rest
 * of the application.
 */
const componentMap = {
  // replace links (<a /> tags) with our "smart" Link component.
  a: ({ href, ...props }) => <Link to={ href } { ...props } />,
  p: props => <Paragraph { ...props } />,
  h1: props => <Typography level="h1" { ... props } />,
  h2: props => <Typography level="h2" { ... props } />,
  h3: props => <Typography level="h3" { ... props } />,
  h4: props => <Typography level="h4" { ... props } />,
  h5: props => <Typography varient="title-lg" { ... props } />,
  h6: props => <Typography varient="title-md" { ... props } />,
  blockquote: props => <Blockquote { ...props } />,
  pre: props => <Codeblock { ...props } />,
}

export const Markdown = props => {
  return (
    <ReactMarkdown
      { ...props }
      components={ componentMap }
      remarkPlugins={ [remarkGfm] }
    />
  )
}