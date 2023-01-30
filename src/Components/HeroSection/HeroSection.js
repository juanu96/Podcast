import React, { useState, useEffect, useContext } from 'react'
import { gql, useQuery } from "@apollo/client";
import './HeroSection.scss'
import { Store } from '../../App';
const HEROSECTION = gql`
  {
    pages(where: {id: 8}) {
      edges {
        node {
          home {
            herosection {
              content
              fieldGroupName
              subheader
              textheader
              listenon {
                companylogo {
                  image {
                    mediaItemUrl
                    title
                  }
                  link
                }
              }
              image {
                enableCustomBackgroundImage
                heroimage {
                  mediaItemUrl
                }
                custombackground {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
    }
    `;

export default function HeroSection() {
  const store = useContext(Store)
  const [heroSection, setHeroSection] = useState(null);
  const { loading, data } = useQuery(HEROSECTION, {
    onCompleted: (data) => {
      setHeroSection(data?.pages?.edges[0]?.node?.home?.herosection)
    }
  });

  useEffect(() => {
    store.setLoadingHero(heroSection)
  }, [heroSection])

  return (
    <div className='herosection'>
      <div className='herosectionrow'>
        <div className='herosectionrowcontent'>
          <div className='heroinformation'>
            <div className='line'>
              <h6
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true">{heroSection ? heroSection.subheader : null}</h6>
            </div>
            <h2
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true">{heroSection ? heroSection.textheader : null}</h2>
            <p data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="150"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true">{heroSection ? heroSection.content : null}</p>
            <div className='listenon'>
              {
                heroSection
                  ? heroSection?.listenon?.companylogo?.map((item, key) => {
                    return (
                      <img data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay={key + "50"}
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true" key={key} src={item.image.mediaItemUrl} alt={item.image.title} />
                    )
                  })
                  : null
              }
            </div>
          </div>
          <div className='heroimage'>
            {
              heroSection?.image?.enableCustomBackgroundImage === 'True' ? <img className='custombg' data-aos="fade-left"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true" src={heroSection?.image?.custombackground?.mediaItemUrl} alt='' />
                : null
            }
            <img data-aos="fade-left"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true" src={heroSection ? heroSection?.image?.heroimage?.mediaItemUrl : null} alt={heroSection ? heroSection?.image?.heroimage?.title : null} />
          </div>
        </div>
      </div>
    </div>
  )
}