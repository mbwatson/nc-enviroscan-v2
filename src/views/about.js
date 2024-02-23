import { ContentPage } from '@components/layout'
import { Markdown } from '@components/markdown'
import content from '@content/about.md'

export const AboutView = () => {
  return (
    <ContentPage>
      <Markdown>{ content }</Markdown>
    </ContentPage>
  )
}