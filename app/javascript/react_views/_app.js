import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

function App({ Page, pageProps, ssr }) {
  const helmetProviderProps = {}

  if (ssr) {
    pageProps.helmetContext = {}
    helmetProviderProps.context = pageProps.helmetContext
  }

  return (
    <HelmetProvider {...helmetProviderProps}>
      <Page {...pageProps} />
    </HelmetProvider>
  )
}

App.prerender = ({ render, ctx }) => {
  const sheet = new ServerStyleSheet()
  let head = ''

  try {
    const body = render(app => sheet.collectStyles(app))
    head += helmetToString(ctx.pageProps.helmetContext.helmet)
    head += sheet.getStyleTags()
    return { body, head }
  } finally {
    sheet.seal()
  }
}

function helmetToString(helmet) {
  return [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString()
  ]
    .filter(Boolean)
    .join('\n')
}

export default App
