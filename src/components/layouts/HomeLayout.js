import React from 'react'
import Page from '../Page'
import Header from '../Header'
import config from '../../config'

export default ({ children }) => {
  return (
    <Page>
      <code>Home Layout</code>
      <Header>{config.defaultHeader}</Header>
      {children}
    </Page>
  )
}
