import React from 'react'
import { rhythm } from '../utils/typography'

import style from './page.module.css'

const Page = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(30),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
      className={'page ' + style.page}
    >
      {children}
    </div>
  )
}

export default Page
