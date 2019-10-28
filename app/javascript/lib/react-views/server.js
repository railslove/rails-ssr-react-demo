import React from 'react'
import ReactDOMServer from 'react-dom/server'

require('source-map-support').install({
  retrieveSourceMap: filename => {
    return {
      url: filename,
      map: readSourceMap(filename) // attached in ruby to ReactViews::ServerRenderer
    }
  }
})

export function prerenderViews({ viewResolver, App }) {
  global.__react_views_exec = ({ ctx }) => {
    const { viewName, viewProps } = ctx

    const viewModule = viewResolver(`./${viewName}.html.js`)
    const View = viewModule.__esModule ? viewModule.default : viewModule

    const app = <App View={View} viewProps={viewProps} ssr />

    const { body, head } = App.prerender({
      app,
      ctx: { viewProps, viewName, View }
    })

    return { body, head }
  }
}
