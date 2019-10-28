// This is an example of the bare minimum of App.js

import React from 'react'
import { renderToString } from 'react-dom/server'

function App({ View, viewProps, ssr }) {
  return <View {...viewProps} />
}

App.prerender = ({ app, ctx }) => {
  // ctx: { viewProps, viewName, View }
  // app: the react component to render

  const body = renderToString(app)

  // return custom head with return { body, head }
  return { body }
}

export default App
