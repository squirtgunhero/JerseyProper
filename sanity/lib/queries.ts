import { groq } from 'next-sanity'

// Get all posts with author and categories
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Get a single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
    publishedAt,
    "author": author->{
      _id,
      name,
      bio,
      image
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Get related posts (same category, excluding current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $currentId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Get all authors
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    bio,
    image
  }
`
