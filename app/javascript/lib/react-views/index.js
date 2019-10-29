import React from 'react'
import ReactDOM from 'react-dom'

export async function hydrateViews({ asyncViewResolver, App }) {
  document.addEventListener('DOMContentLoaded', async event => {
    const $data = document.getElementById('__react-views-data')
    const $root = document.getElementById('__react-views')
    const data = JSON.parse($data.innerHTML)

    const viewModule = await asyncViewResolver(data.viewName)
    const View = viewModule.__esModule ? viewModule.default : viewModule

    ReactDOM.hydrate(<App View={View} viewProps={data.viewProps} />, $root)
  })
}
