/* global ReactViews */

import React from 'react'
import ReactDOMServer from 'react-dom/server'

export function prerenderViews({ viewResolver, App }) {
  ReactViews.sendOutput(() => {
    const { viewName, props } = ReactViews.ctx

    const pageModule = viewResolver(`./${viewName}.html.js`)
    const Page = pageModule.__esModule ? pageModule.default : pageModule

    const app = <App Page={Page} pageProps={props} ssr />

    const { body, head } = App.prerender({
      render: (cb = app => app) => {
        return ReactDOMServer.renderToString(cb(app))
      },
      ctx: { pageProps: props, Page }
    })

    return { body, head }
  })
}
