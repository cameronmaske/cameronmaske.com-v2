import React, { Component } from 'react'
import Helmet from 'react-helmet'
import config from '../config'

class SEO extends Component {
  render() {
    console.log(config)
    const twitter = config.twitter
    const siteDescription = config.description
    const siteUrl = config.description
    const siteTitle = config.title
    const siteAuthor = config.author
    const {
      title,
      description,
      author,
      summaryImage,
      twitterTitle,
      twitterDescription,
      article,
      url,
      date,
      modifieredDate,
    } = this.props

    let meta = [
      {
        name: 'twitter:site',
        content: twitter,
      },
      {
        name: 'twitter:creator',
        content: twitter,
      },
      {
        name: 'author',
        content: author || siteAuthor,
      },
      {
        name: 'description',
        content: description || siteDescription,
      },
      {
        name: 'twitter:description',
        content: twitterDescription || description || siteDescription,
      },
      {
        property: 'og:description',
        content: description || siteDescription,
      },
      {
        property: 'og:author',
        content: author || siteAuthor,
      },
      {
        property: 'og:title',
        content: title || siteTitle,
      },
      {
        name: 'twitter:title',
        content: twitterTitle || title || siteTitle,
      },
    ]
    if (date) {
      meta = [
        ...meta,
        {
          property: 'article:published_time',
          content: date,
        },
      ]
    }
    if (modifiedDate) {
      meta = [
        ...meta,
        {
          property: 'article:modified_time',
          content: modifiedDate,
        },
      ]
    }
    if (url) {
      meta = [
        ...meta,
        {
          property: 'og:url',
          content: url,
        },
      ]
    }
    if (article) {
      meta = [...meta, { property: 'og:type', content: 'article ' }]
    }
    if (summaryImage) {
      meta = [
        ...meta,
        {
          property: 'og:image',
          content: summaryImage,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: summaryImage,
        },
      ]
    }
    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={meta}
        title={title || siteTitle}
      />
    )
  }
}

export default SEO
