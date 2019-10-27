import App from '../react_views/_app'
import { prerender } from '../lib/react-views/server'

global.renderReactViews = prerender({
  viewResolver: require.context('../../views', true, /\.js$/),
  App
})
