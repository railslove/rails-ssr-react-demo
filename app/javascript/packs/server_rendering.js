// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.
var componentRequireContext = require.context('../../views', true, /\.js$/)
var ReactRailsUJS = require('react_ujs')
var React = require("react")
var ReactDOM = require("react-dom")
var ReactDOMServer = require("react-dom/server")
import { ServerStyleSheet } from 'styled-components'

ReactRailsUJS.getConstructor = className => {
  const componentModule = componentRequireContext(`./${className}.html.js`)
  return componentModule.__esModule
    ? componentModule.default
    : componentModule
}

ReactRailsUJS.serverRender = function(renderFunction, componentName, props) {
  const sheet = new ServerStyleSheet()

  const parts = {}

  try {
    var componentClass = this.getConstructor(componentName)
    var element = React.createElement(componentClass, props)

    parts.html = ReactDOMServer.renderToString(sheet.collectStyles(element))
    parts.styles = sheet.getStyleTags()
  } catch (error) {
    sheet.seal() // seal must be called to prevent memory leaks
    throw error
  } finally {
    sheet.seal()  // seal must be called to prevent memory leaks
  }

  return JSON.stringify(parts)
}
