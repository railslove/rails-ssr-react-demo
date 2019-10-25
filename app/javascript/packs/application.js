// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'

require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

const ReactRailsUJS = require('react_ujs')
ReactRailsUJS.getConstructor = async className => {
  const componentModule = await import(`../../views/${className}.html.js`)
  return componentModule.__esModule ? componentModule.default : componentModule
}

// async version of react_ujs' mountComponents
// https://github.com/reactjs/react-rails/blob/f1516cd93870ff46902722c607208012f49a7a88/react_ujs/index.js#L85-L121
ReactRailsUJS.mountComponents = async function(searchSelector) {
  const ujs = ReactRailsUJS
  const nodes = ujs.findDOMNodes(searchSelector)

  for (let node of nodes) {
    const className = node.getAttribute(ujs.CLASS_NAME_ATTR)
    const ComponentClass = await ujs.getConstructor(className) // <- modified to be async
    const propsJson = node.getAttribute(ujs.PROPS_ATTR)
    const props = propsJson && JSON.parse(propsJson)
    const hydrate = node.getAttribute(ujs.RENDER_ATTR)
    const cacheId = node.getAttribute(ujs.CACHE_ID_ATTR)
    const turbolinksPermanent = node.hasAttribute(ujs.TURBOLINKS_PERMANENT_ATTR)

    if (!ComponentClass) {
      const message = "Cannot find component: '" + className + "'"
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
    }

    // Modified to support providers (e.g. helmet for thread-safety)
    const component = this.components[cacheId] || (
      <HelmetProvider>
        <ComponentClass {...props} />
      </HelmetProvider>
    )

    if (turbolinksPermanent && !this.components[cacheId]) {
      this.components[cacheId] = component
    }

    if (hydrate && typeof ReactDOM.hydrate === 'function') {
      ReactDOM.hydrate(component, node)
    } else {
      ReactDOM.render(component, node)
    }
  }
}
