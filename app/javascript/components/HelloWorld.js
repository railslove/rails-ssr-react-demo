import React from 'react'
import PropTypes from 'prop-types'

const HelloWorld = ({ greeting }) => {
  return <div>Hello {greeting}!</div>
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
}

export default HelloWorld
