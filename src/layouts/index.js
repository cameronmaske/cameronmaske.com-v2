import React from 'react'
import Subheader from '../components/Subheader'
import Header from '../components/Header'
import Page from '../components/Page'

// Types faces
require('typeface-montserrat')
require('typeface-merriweather')
// PrismJS styling
require('prism-themes/themes/prism-a11y-dark.css')
// Global styles
import '../styles/index.scss'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const siteTitle = 'Cameron Maske'

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    let header = null
    if (location.pathname === rootPath) {
      header = <Header>{siteTitle}</Header>
    } else {
      header = <Subheader>{siteTitle}</Subheader>
    }
    if (
      location.pathname.includes('course') &&
      location.pathname.includes('/watch/')
    ) {
      return <div>{children()}</div>
    } else {
      return (
        <Page>
          {header}
          {children()}
        </Page>
      )
    }
  }
}

export default Template
