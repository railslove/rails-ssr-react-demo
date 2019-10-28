import App from '../react_views/_app'
import { hydrateViews } from '../lib/react-views'

require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

hydrateViews({
  asyncViewResolver: viewName => import(`../../views/${viewName}.html.js`),
  App
})
