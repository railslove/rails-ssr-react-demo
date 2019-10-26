// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'

require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

async function resolveViewComponent(viewName) {
  const componentModule = await import(`../../views/${viewName}.html.js`)
  return componentModule.__esModule ? componentModule.default : componentModule
}

document.addEventListener('DOMContentLoaded', async event => {
  const $data = document.getElementById('__react-views-data')
  const $root = document.getElementById('__react-views')

  const data = JSON.parse($data.innerHTML)
  const ComponentClass = await resolveViewComponent(data.viewName)

  const app = (
    <HelmetProvider>
      <ComponentClass {...data.props} />
    </HelmetProvider>
  )

  ReactDOM.hydrate(app, $root)
})
