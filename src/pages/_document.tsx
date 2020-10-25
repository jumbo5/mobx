import React from 'react'
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet as StyledServerStyleSheets } from 'styled-components'

interface Props extends DocumentProps {}

class AppDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const styledSheets = new StyledServerStyleSheets()

    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledSheets.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <React.Fragment key="styles">
            {initialProps.styles}
            {styledSheets.getStyleElement()}
          </React.Fragment>
        ),
      }
    } finally {
      styledSheets.seal()
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          {this.props.styles}
          <link href="/styles/antd.min.css" rel="stylesheet" />
          <link href="/styles/colorful.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
