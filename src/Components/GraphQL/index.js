import { gql } from '@apollo/client'

export const RECENTPODCASTS = gql`
{
  podcasts(first: 4) {
    nodes {
      link
      title
    }
  }
}`;

export const ITEMSMENU = gql`
{
    acfOptionsGlobalOptions {
    menu {
      menu {
        button {
          text
          url
        }
        logo {
          link
          title
          mediaItemUrl
        }
      }
    }
  }
}
`;

export const MENU = gql`
{
    menus(where: {location: MAIN_MENU}) {
      nodes {
        menuItems {
          nodes {
            uri
            menuItemId
            label
          }
        }
      }
    }
  }`

export const FOOTER = gql`
{
    acfOptionsGlobalOptions {
        footer {
            footersection {
                logo {
                    mediaItemUrl
                }
                history
                socialIcons {
                    facebook
                    instagram
                    linkdin
                    skype
                }
                listenonpodcast {
                    logo {
                        mediaItemUrl
                    }
                    url
                }
            }
        }
    }
}
`

export const PODCASTS = gql`
query GET_PODCASTS($first: Int) {
  podcasts(first: $first) {
    nodes {
      date
      uri
      title
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          name
          link
        }
      }
      tags {
        nodes {
          name
          link
        }
      }
    }
  }
}`;

export const POST = gql`
query POST($slug: String) {
  postBy(slug: $slug) {
    title
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    content
  }
}`;

export const POSTPODCAST = gql`
query POST_PODCAST($slug: String) {
  podcastBy(slug: $slug) {
    title
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    content
  }
}`;

export const POSTSLIDER = gql`
{
    posts(first: 6) {
        nodes {
          author {
            node {
              name
            }
          }
          date
          uri
          content
          title
          categories {
            nodes {
              name
            }
          }
          databaseId
        }
      }
}
`

export const GALLERY = gql`
  {
    pages(where: {id: 8}) {
      edges {
        node {
          gallery {
            title
            gallery {
              mediaItemUrl
              title
            }
          }
        }
      }
    }
  }
`;