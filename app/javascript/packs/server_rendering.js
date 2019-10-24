// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.
var componentRequireContext = require.context('../../views', true, /\.js$/)
var ReactRailsUJS = require('react_ujs')
ReactRailsUJS.getConstructor = className => {
  const componentModule = componentRequireContext(`./${className}.html.js`)
  return componentModule.__esModule
    ? componentModule.default
    : componentModule
}
