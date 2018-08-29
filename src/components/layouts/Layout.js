import React from 'react'
import Page from '../Page'
import Subheader from '../Subheader'
import config from '../../config'

export default ({ children }) => {
  return (
    <Page>
      <Subheader>{config.defaultHeader}</Subheader>
      {children}
    </Page>
  )
}
