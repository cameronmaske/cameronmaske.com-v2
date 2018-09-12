import rehypeReact from 'rehype-react'
import React from 'react'
import Transcript from '../components/Transcript'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    transcript: Transcript,
  },
}).Compiler

export default renderAst
