// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')
var React = require("react")
var ReactDOM = require("react-dom")
var ReactDOMServer = require("react-dom/server")

var ReactRailsUJS = require('react_ujs')
ReactRailsUJS.getConstructor = async className => {
  const componentModule = await import(`../../views/${className}.html.js`)
  return componentModule.__esModule ? componentModule.default : componentModule
}

// This is exactly the same as react_ujs' mountComponents, except with `await ujs.getConstructor`
// https://github.com/reactjs/react-rails/blob/f1516cd93870ff46902722c607208012f49a7a88/react_ujs/index.js#L85-L121
ReactRailsUJS.mountComponents = async function(searchSelector) {
  var ujs = ReactRailsUJS
  var nodes = ujs.findDOMNodes(searchSelector)

  for (let node of nodes) {
    var className = node.getAttribute(ujs.CLASS_NAME_ATTR)
    var constructor = await ujs.getConstructor(className)
    var propsJson = node.getAttribute(ujs.PROPS_ATTR)
    var props = propsJson && JSON.parse(propsJson)
    var hydrate = node.getAttribute(ujs.RENDER_ATTR)
    var cacheId = node.getAttribute(ujs.CACHE_ID_ATTR)
    var turbolinksPermanent = node.hasAttribute(ujs.TURBOLINKS_PERMANENT_ATTR)

    if (!constructor) {
      var message = "Cannot find component: '" + className + "'"
      if (console && console.log) {
        console.log(
          '%c[react-rails] %c' + message + ' for element',
          'font-weight: bold',
          '',
          node
        )
      }
      throw new Error(
        message + '. Make sure your component is available to render.'
      )
    } else {
      var component = this.components[cacheId]
      if (component === undefined) {
        component = React.createElement(constructor, props)
        if (turbolinksPermanent) {
          this.components[cacheId] = component
        }
      }

      if (hydrate && typeof ReactDOM.hydrate === 'function') {
        component = ReactDOM.hydrate(component, node)
      } else {
        component = ReactDOM.render(component, node)
      }
    }
  }
}
