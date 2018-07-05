import React from 'react'

const Project = ({ name, description, image, url }) => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <h4>{ name }</h4>
    { description }
    <a href={url}>{url}</a>
    <img src={image}/>
  </div>
)

export default Project
