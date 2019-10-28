import App from '../react_views/_app'
import { prerenderViews } from '../lib/react-views/server'

prerenderViews({
  viewResolver: require.context('../../views', true, /\.js$/),
  App
})
