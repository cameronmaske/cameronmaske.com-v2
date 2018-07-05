import React from "react";
import Link from "gatsby-link";


export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges.map((edge) => {
        const node = edge.node
        return (
            <div key={node.id}>
                <Link
                    to={node.fields.slug}
                >
                    <h3>{node.frontmatter.title}</h3>
                </Link>
                <p>{node.excerpt}</p>
            </div>
        )
    })
    return (
        <div>
            <h1> Writings </h1>
            <h4> {data.allMarkdownRemark.totalCount} Posts </h4>
            { posts }
        </div>
    )
}

export const query = graphql`
    query IndexQuery {
        allMarkdownRemark {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
              }
              fields {
                  slug
              }
              excerpt
            }
          }
        }
    }
`
