import React from 'react'
import { parse } from 'subtitle'
import { FileText } from 'react-feather'

function isNumeric(value) {
  return /^-{0,1}\d+$/.test(value)
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

const Transcript = ({ children }) => {
  const captionsText = children.toString()
  const splitByNewline = captionsText.split(/\r\n|\n|\r/)
  let formatted = []
  for (let line of splitByNewline) {
    if (line) {
      if (isNumeric(line)) {
        formatted.push('')
      }
      formatted.push(line)
      console.log(line)
    }
  }
  const parsed = parse(formatted.join('\n'))
  const renderChildren = parsed.map(item => {
    return (
      <p key={item.start}>
        <span>
          <strong>[{millisToMinutesAndSeconds(item.start)}] </strong>
        </span>
        {item.text}
      </p>
    )
  })
  let styles = {
    minHeight: '280px',
    maxHeight: '280px',
    marginBottom: '1rem',
    padding: '10px',
    paddingRight: '20px',
    overflowY: 'scroll',
    border: '1px solid #e1e1e1',
    borderRadius: '3px',
    background: '#fcfcfcc7',
  }
  let containerStyle = {
    marginTop: '2rem',
  }
  return (
    <div style={containerStyle}>
      <h4 style={{ marginTop: 0 }}>
        <FileText style={{ verticalAlign: 'middle', marginBottom: '3px' }} />{' '}
        Transcript
      </h4>
      <div style={styles} itemprop="transcript">
        {renderChildren}
      </div>
    </div>
  )
}

export default Transcript
