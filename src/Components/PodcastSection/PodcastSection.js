import React, { useState, useEffect } from 'react'
import { useLazyQuery } from "@apollo/client";
import Button from '../Elements/Button';
import './PodcastSection.scss'
import { PODCASTS } from '../GraphQL'
export default function PodcastSection() {
  const [numberOfPost, setNumberOfPost] = useState(3);
  const [getPost, { loading, data }] = useLazyQuery(PODCASTS)
  useEffect(() => {
    if (!loading) {
      getPost({
        variables: {
          first: numberOfPost,
        }
      })
    }
  }, [loading, numberOfPost, getPost])

  const TotalEpisodes = () => {
    if (numberOfPost === 3) {
      setNumberOfPost(6)
    } else {
      setNumberOfPost(3)
    }
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className='podcastSection'>
      <div className='podcastrow'>
        <div className='allPodcast'>
          <h2>Latest Podcast Episodes</h2>
          <Button link='blog' text="View All" />
        </div>
        <div>
          {
            !loading
              ? data?.podcasts?.nodes?.map((item, key) => {
                return (
                  <div key={key} className="itemPodcast"
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true">
                    <div className="image">
                      <img src={item?.featuredImage?.node?.mediaItemUrl} alt="" />
                    </div>
                    <div className="content">
                      <h4>{item.title}</h4>
                      <div className='contentpodcast' dangerouslySetInnerHTML={{ __html: item.content }} />
                      <Button link={item.uri} text="Know more" withbg={false} />
                    </div>
                    <div className="basis-1/4 tagsInfo">
                      <div className='categorieLink'>
                        <a href={item?.categories?.nodes[0]?.link}># {item.categories.nodes[0].name}</a>
                      </div>
                      <p className='text-tertiary mb-4'># Posted on {new Date(item.date).toLocaleDateString('en-EN', options)}</p>
                      {
                        item.tags.nodes.map((item, key, arr) => {
                          return (
                            <span key={key} className='text-tertiary'>
                              {key === 0 ? '#' : null} <a key={key} href={item.link}>{item.name}</a> {key === arr.length - 1 ? null : '/ '}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
              : null
          }
        </div>
        <div onClick={() => TotalEpisodes()} className='showmore'>
          <Button text={numberOfPost === 3 ? "Show More Episodes" : "Show Less Episodes"} />
        </div>
      </div>
    </div>
  )
}
