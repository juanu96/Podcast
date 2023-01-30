import React from 'react'
import { POST } from '../../Components/GraphQL'
import { useQuery } from "@apollo/client";
import Loader from '../Loader'
import './Post.scss'
export default function Post() {
  const parts = window.location.href.split('/');
  const lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
  const { loading, data } = useQuery(POST, {
    variables: {
      slug: lastSegment
    }

  })

  return (
    <div className='postSection'>
      <div className='postRow'>
        {
          !loading ?
            <>
              <img src={data.postBy.featuredImage.node.mediaItemUrl} alt={data.postBy.title} />
              <h1>{data.postBy.title}</h1>
              <div className='content' dangerouslySetInnerHTML={{ __html: data.postBy.content }} />
            </>
            : <Loader />
        }

      </div>
    </div>
  )
}
