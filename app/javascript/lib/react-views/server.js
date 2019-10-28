import React from 'react'
import ReactDOMServer from 'react-dom/server'

require('source-map-support').install({
  retrieveSourceMap: filename => {
    return {
      url: filename,
      map: readSourceMap(filename) // attached in ruby to rails_views
    }
  }
})

export function prerenderViews({ viewResolver, App }) {
  global.__react_views_exec = ({ ctx }) => {
    const { viewName, props } = ctx

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
  }
}
