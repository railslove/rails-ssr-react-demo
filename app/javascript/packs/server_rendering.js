// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'

const ReactRailsUJS = require('react_ujs')
const componentRequireContext = require.context('../../views', true, /\.js$/)

ReactRailsUJS.getConstructor = className => {
  const componentModule = componentRequireContext(`./${className}.html.js`)
  return componentModule.__esModule ? componentModule.default : componentModule
}

ReactRailsUJS.serverRender = function(renderFunction, componentName, props) {
  const sheet = new ServerStyleSheet()
  let rendered = ''

  // Render react component. We need not only the html of the component, but
  // also styles from css-in-js libraries and react-helmet, which should be
  // positioned outside of the components in the html document (inside <head>).
  // Those parts get stringified as JSON, and the server parses this JSON and
  // places the parts in the correct positions.
  try {
    const Component = this.getConstructor(componentName)
    const helmetContext = {}
    const app = (
      <HelmetProvider context={helmetContext}>
        <Component {...props} />
      </HelmetProvider>
    )

    rendered += ReactDOMServer.renderToString(sheet.collectStyles(app))
    rendered += '<!--SSR_HEAD_START-->'
    rendered += helmetToString(helmetContext.helmet)
    rendered += '\n'
    rendered += sheet.getStyleTags()
  } catch (error) {
    sheet.seal()
    rendered = `<pre>${error.toString()}</pre>`
  }

  return rendered
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
