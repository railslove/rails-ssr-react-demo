import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Greeting = ({ name }) => {
  return <Title onClick={() => alert('hi!')}>Hellooo {name}!</Title>
}

Greeting.propTypes = {
  name: PropTypes.string
}

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  background-color: papayawhip;
  font-family: sans-serif;
  padding: 50px;
`;


export default Greeting
