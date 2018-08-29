import React, { Component } from 'react'
import Helmet from 'react-helmet'
import config from '../config'
import PropTypes from 'prop-types'
import favicon from '../assets/favicon.ico'
import { withPrefix } from 'gatsby-link'

class SEO extends Component {
  render() {
    const twitter = config.twitter
    const siteDescription = config.description
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
      modifiedDate,
      video,
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
      const summaryImagePrex = withPrefix(summaryImage)
      meta = [
        ...meta,
        {
          property: 'og:image',
          content: summaryImagePrex,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: summaryImagePrex,
        },
      ]
    }
    let schemaOrgJSONLD = null
    if (video) {
      schemaOrgJSONLD = {
        '@context': 'http://schema.org',
        '@type': 'VideoObject',
        name: video.name,
        description: video.description,
        thumbnailUrl: [config.siteUrl + withPrefix(video.thumbnailUrl)],
        uploadDate: video.uploadDate,
        duration: video.duration,
        embedUrl: video.embedUrl,
      }
      for (let [key, value] of Object.entries(schemaOrgJSONLD)) {
        if (!value) {
          console.error(`${key} is null for JSONLD`)
        }
      }
    }

    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={meta}
        title={title || siteTitle}
        link={[{ rel: 'shortcut icon', href: `${favicon}` }]}
      >
        {schemaOrgJSONLD ? (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
        ) : null}
      </Helmet>
    )
  }
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  summaryImage: PropTypes.string,
  twitterTitle: PropTypes.string,
  twitterDescription: PropTypes.string,
  article: PropTypes.bool,
  url: PropTypes.string,
  date: PropTypes.string,
  modifiedDate: PropTypes.string,
}

export default SEO
