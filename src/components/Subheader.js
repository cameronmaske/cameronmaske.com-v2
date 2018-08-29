import React from 'react'
import Link from 'gatsby-link'
import { rhythm, scale } from '../utils/typography'

const Subheader = ({ children }) => {
  return (
    <h3
      style={{
        fontFamily: 'Montserrat, sans-serif',
        marginTop: 0,
        marginBottom: rhythm(-1),
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
        {children}
      </Link>
    </h3>
  )
}

export default Subheader
