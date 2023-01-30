import React from 'react'
import { useQuery } from "@apollo/client";
import './HeroSection.scss'
import { HEROSECTION } from '../GraphQL';

export default function HeroSection() {
  const { loading, data } = useQuery(HEROSECTION, {
    variables: {
      uri: window.location.pathname
    }
  });

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
                data-aos-mirror="true">{!loading ? data?.nodeByUri?.home?.herosection?.subheader : null}</h6>
            </div>
            <h2
              data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="100"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true">{!loading ? data?.nodeByUri?.home?.herosection?.textheader : null}</h2>
            <p data-aos="fade-up"
              data-aos-offset="200"
              data-aos-delay="150"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true">{!loading ? data?.nodeByUri?.home?.herosection?.content : null}</p>
            <div className='listenon'>
              {
                !loading ? data?.nodeByUri?.home?.herosection?.listenon?.companylogo?.map((item, key) => {
                  return (
                    <a  key={key} href={item.link} target="_blank" rel="noreferrer">
                      <img data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-delay={key + "50"}
                        data-aos-duration="1000"
                        data-aos-easing="ease-in-out"
                        data-aos-mirror="true" src={item.image.mediaItemUrl} alt={item.image.title} />
                    </a>
                  )
                })
                  : null
              }
            </div>
          </div>
          <div className='heroimage'>
            {
              data?.nodeByUri?.home?.herosection?.image?.enableCustomBackgroundImage === 'True' ? <img className='custombg' data-aos="fade-left"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true" src={!loading ? data?.nodeByUri?.home?.herosection?.image?.custombackground?.mediaItemUrl : null} alt='' />
                : null
            }
            <img data-aos="fade-left"
              data-aos-offset="200"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true" alt='' src={!loading ? data?.nodeByUri.home.herosection.image.heroimage.mediaItemUrl : null} />
          </div>
        </div>
      </div>
    </div>
  )
}