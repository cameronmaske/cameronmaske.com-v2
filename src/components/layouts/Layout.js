import React from 'react'
import Page from '../Page'
import Navbar from './Navbar'

export default ({ children }) => {
  return (
    <Page>
      <Navbar />
      {children}
    </Page>
  )
}
