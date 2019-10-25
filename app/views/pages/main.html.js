import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

import Greeting from '@/components/Greeting'

const HelloWorld = ({ greeting }) => {
  return (
    <div>
      <Helmet>
        <title>Hello World!</title>
      </Helmet>
      <Greeting name={greeting} />
    </div>
  )
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
}

export default HelloWorld
