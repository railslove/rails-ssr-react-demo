import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

const viewRequireContext = require.context('../../views', true, /\.js$/)

global.prerender = (viewName, props) => {
  const viewModule = viewRequireContext(`./${viewName}.html.js`)
  const Component = viewModule.__esModule ? viewModule.default : viewModule

  const sheet = new ServerStyleSheet()
  let view = '', head = ''

  try {
    const helmetContext = {}
    const app = (
      <HelmetProvider context={helmetContext}>
        <Component {...props} />
      </HelmetProvider>
    )

    view = ReactDOMServer.renderToString(sheet.collectStyles(app))

    head += helmetToString(helmetContext.helmet)
    head += '\n'
    head += sheet.getStyleTags()
  } catch (error) {
    sheet.seal()
    view = `<pre>${error.toString()}</pre>`
  }

  return { view, head }
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
