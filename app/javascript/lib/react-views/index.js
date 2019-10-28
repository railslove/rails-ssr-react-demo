import React from 'react'
import ReactDOM from 'react-dom'

export async function hydrateViews({ asyncViewResolver, App }) {
  document.addEventListener('DOMContentLoaded', async event => {
    const $data = document.getElementById('__react-views-data')
    const $root = document.getElementById('__react-views')
    const data = JSON.parse($data.innerHTML)

    const pageModule = await asyncViewResolver(data.viewName)
    const Page = pageModule.__esModule ? pageModule.default : pageModule

    ReactDOM.hydrate(<App Page={Page} pageProps={data.props} />, $root)
  })
}
