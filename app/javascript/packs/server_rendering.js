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
  const outputs = {}

  // Render react component. We need not only the html of the component, but
  // also styles from styled-components (and in the future more parts) which
  // should be positioned outside of the components in the html document (e.g.)
  // inside <head>.
  // Those parts get stringified as JSON, and the server parses this JSON and
  // places the parts in the correct positions.
  try {
    var componentClass = this.getConstructor(componentName)
    var element = React.createElement(componentClass, props)

    outputs.html = ReactDOMServer.renderToString(sheet.collectStyles(element))
    outputs.styles = sheet.getStyleTags()
  } catch (error) {
    sheet.seal() // seal must be called to prevent memory leaks
    throw error
  } finally {
    sheet.seal()  // seal must be called to prevent memory leaks
  }

  return JSON.stringify(outputs)
}
