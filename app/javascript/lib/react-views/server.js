import React from 'react'
import ReactDOMServer from 'react-dom/server'

export function prerender({ viewResolver, App }) {
  return (viewName, pageProps) => {
    const pageModule = viewResolver(`./${viewName}.html.js`)
    const Page = pageModule.__esModule ? pageModule.default : pageModule

    const app = <App Page={Page} pageProps={pageProps} ssr />

    const { body, head } = App.prerender({
      render: (cb = app => app) => {
        return ReactDOMServer.renderToString(cb(app))
      },
      ctx: { pageProps, Page }
    })

    return { body, head }
  }
}
