const { environment } = require('@rails/webpacker')
const path = require('path')

const babelLoader = environment.loaders.get('babel')

// Add app/views/ to files which will be processed by babel-loader
babelLoader.include.push(path.resolve(__dirname, '../..', 'app/views'))

module.exports = environment
