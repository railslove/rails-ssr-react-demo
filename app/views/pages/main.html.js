import React from 'react'
import PropTypes from 'prop-types'

import Greeting from '@/components/Greeting'

const HelloWorld = ({ greeting }) => {
  return (
    <div>
      <Greeting name={greeting} />
    </div>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
}

export default HelloWorld
