// This is an example of the bare minimum of _app.js

import React from 'react'

function App({ Page, pageProps, ssr }) {
  return <Page {...pageProps} />
}

App.prerender = ({ render, ctx }) => {
  const body = render()
  return { body }
}

export default App
