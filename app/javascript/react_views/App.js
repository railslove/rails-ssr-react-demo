import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

function App({ View, viewProps, ssr }) {
  const helmetProviderProps = {}

  if (ssr) {
    viewProps.helmetContext = {}
    helmetProviderProps.context = viewProps.helmetContext
  }

  return (
    <HelmetProvider {...helmetProviderProps}>
      <View {...viewProps} />
    </HelmetProvider>
  )
}

App.prerender = ({ app, ctx }) => {
  const sheet = new ServerStyleSheet()
  let head = ''

  try {
    const body = renderToString(sheet.collectStyles(app))
    head += helmetToString(ctx.viewProps.helmetContext.helmet)
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
