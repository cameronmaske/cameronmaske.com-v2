import React from 'react'
import Link from 'gatsby-link'
import { rhythm, scale } from '../utils/typography'
import Subheader from '../components/Subheader'
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
    let header
    const siteTitle = 'Cameron Maske'

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {siteTitle}
          </Link>
        </h1>
      )
    } else {
      header = <Subheader>{siteTitle}</Subheader>
    }
    return (
      <Page>
        {header}
        {children()}
      </Page>
    )
  }
}

export default Template
