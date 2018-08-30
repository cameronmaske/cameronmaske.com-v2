import React from 'react'
import Link from 'gatsby-link'
import config from '../../config'

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <header
    style={{ marginBottom: `1.5rem`, fontFamily: 'Montserrat, sans-serif' }}
  >
    <h3
      style={{
        display: `inline`,
        fontWeight: 800,
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <Link
        to="/"
        style={{
          textShadow: `none`,
          backgroundImage: `none`,
          color: 'inherit',
        }}
      >
        {config.defaultHeader}
      </Link>
    </h3>
    <ul
      style={{
        listStyle: `none`,
        float: `right`,
        fontWeight: 500,
      }}
    >
      <ListLink to="/courses/introduction-to-pytest/">Pytest Course</ListLink>
    </ul>
  </header>
)
