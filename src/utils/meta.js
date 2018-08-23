export const description = (description, twitterDescription) => {
  return [
    { name: 'description', content: description },
    { name: 'twitter:description', content: twitterDescription },
    { property: 'og:description', content: description },
  ]
}
