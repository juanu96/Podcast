import React from 'react'
import { POSTPODCAST } from '../../Components/GraphQL'
import { useQuery } from "@apollo/client";
import Loader from '../Loader'
import './Podcast.scss'

export default function Podcast() {
    const parts = window.location.href.split('/');
    const lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
    const { loading, data } = useQuery(POSTPODCAST, {
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
                            <img src={data.podcastBy.featuredImage.node.mediaItemUrl} alt={data.podcastBy.title} />
                            <h1>{data.podcastBy.title}</h1>
                            <div className='content' dangerouslySetInnerHTML={{ __html: data.podcastBy.content }} />
                        </>
                        : <Loader />
                }

            </div>
        </div>
    )
}
