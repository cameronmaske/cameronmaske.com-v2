import React from 'react'

// Types faces
require('typeface-montserrat')
require('typeface-merriweather')
// PrismJS styling
require('prism-themes/themes/prism-a11y-dark.css')
// Global styles
import '../styles/index.scss'

class Template extends React.Component {
  render() {
    const { children } = this.props
    return <div>{children()}</div>
  }
}

export default Template
