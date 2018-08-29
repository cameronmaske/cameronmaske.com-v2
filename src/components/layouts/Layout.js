import React from 'react'
import Page from '../Page'
import Subheader from '../Subheader'
import config from '../../config'

export default ({ children }) => {
  return (
    <Page>
      <code>Layout</code>
      <Subheader>{config.defaultHeader}</Subheader>
      {children}
    </Page>
  )
}
