import React from 'react'
import Link from 'gatsby-link'
import config from '../../config'
import { scale } from '../../utils/typography'

const ListLink = props => (
  <li
    style={{
      display: `inline-block`,
      marginLeft: `1rem`,
      marginBottom: `0`,
      verticalAlign: 'middle',
    }}
  >
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => (
  <header style={{ marginBottom: `0`, fontFamily: 'Montserrat, sans-serif' }}>
    <h3
      style={{
        display: `inline`,
        fontWeight: 800,
        fontFamily: 'Montserrat, sans-serif',
        fontSize: scale(1),
        verticalAlign: 'middle',
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
        marginBottom: `0`,
        marginLeft: 0,
        lineHeight: scale(1) * 1.1,
      }}
    >
      <ListLink to="/courses/introduction-to-pytest/">Pytest Course</ListLink>
    </ul>
  </header>
)
