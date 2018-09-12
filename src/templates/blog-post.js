import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Disqus from 'disqus-react'

import Bio from '../components/Bio'
import SEO from '../components/SEO'
import { rhythm, scale } from '../utils/typography'
import dayjs from 'dayjs'
import Layout from '../components/layouts/Layout'
import renderAst from '../utils/render'

class BlogPostTemplate extends React.Component {
  render() {
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl')
    const post = this.props.data.markdownRemark
    const description = post.frontmatter.description || post.excerpt
    const { previous, next } = this.props.pathContext
    const date = dayjs(post.frontmatter.date)
    const pubDate = date.format('YYYY-MM-DD')
    const title = `${post.frontmatter.title} · Cameron Maske`

    return (
      <div>
        <Layout>
          <SEO
            summaryImage={post.frontmatter.summary_image}
            title={title}
            description={description}
            twitterTitle={post.frontmatter.twitter}
            twitterDescription={post.frontmatter.twitter_description}
            date={post.frontmatter.date}
            modifiedDate={post.frontmatter.updated_date}
            article={true}
            url={siteUrl + this.props.location.pathname}
          />
          <h1 itemProp="title">{post.frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
            itemProp="pubdate"
            value={pubDate}
          >
            {date.format('MMMM DD, YYYY')}
          </p>
          <div itemProp="articleBody">{renderAst(post.htmlAst)}</div>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio full={true} />
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          <Disqus.DiscussionEmbed
            shortname={'cameronmaske'}
            config={{
              url: siteUrl + this.props.location.pathname,
              title: post.frontmatter.title,
            }}
          />
        </Layout>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      htmlAst
      frontmatter {
        title
        date
        summary_image
        description
        twitter_description
        twitter_title
        updated_date
        tags
      }
    }
  }
`
