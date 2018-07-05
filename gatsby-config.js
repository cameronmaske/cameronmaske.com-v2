module.exports = {
  siteMetadata: {
    title: 'Cameron Maske',
  },
  plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-styled-components',
      {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
        resolve: 'gatsby-transformer-remark',
        options: {
            plugins: ['gatsby-remark-prismjs'],
        },
    },
      {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    }
  ],
}
