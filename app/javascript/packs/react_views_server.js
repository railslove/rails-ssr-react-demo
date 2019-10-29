import App from '../react_views/App'
import { prerenderViews } from '../lib/react-views/server'

prerenderViews({
  viewResolver: require.context('../../views', true, /\.js$/),
  App
})
