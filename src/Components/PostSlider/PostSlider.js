import React, { useRef } from 'react'
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import Button from '../Elements/Button';
import { POSTSLIDER } from '../GraphQL'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './PostSlider.scss'
import 'swiper/css';

export default function PostSlider() {
    const { loading, data } = useQuery(POSTSLIDER);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const swiperRef = useRef();
    return (
        <div className='PodcastSliderContainer'>
            <div className='PodcastRow'>
                <h2 className='text-4xl text-[#222222] mb-20 text-center'
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true">Blog Posts</h2>
                <div className='slider'>
                    {
                        !loading ? <Swiper
                            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={3}
                            speed={2500}
                            autoplay
                            loop
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            breakpoints={{
                                320: {
                                    centeredSlides: true,
                                    slidesPerView: 1,
                                    spaceBetween: 10
                                },
                                750: {
                                    centeredSlides: false,
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                1024: {
                                    centeredSlides: false,
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                1440: {
                                    centeredSlides: false,
                                    slidesPerView: 3,
                                    spaceBetween: 50
                                }
                            }}
                        >
                            {
                                !loading ? data?.posts?.nodes?.map((item, key) => {
                                    //console.log(item)
                                    return (
                                        <SwiperSlide key={key}>
                                            <div className='post-item'>
                                                <div className='post-info'>
                                                    <div className='post-by'>
                                                        <div className='author'>By {item.author.node.name}</div>
                                                        <div className='date'>{new Date(item.date).toLocaleDateString('en-EN', options)}</div>
                                                    </div>
                                                    <div className='categorie'>{item?.categories?.nodes.map(x => x.name).join(", ")}</div>
                                                </div>
                                                <div className='post-content'>
                                                    <div className='title'><h3>{item.title}</h3></div>
                                                    <div className='excerpt'><p dangerouslySetInnerHTML={{ __html: item.content }} /></div>
                                                    <div className='buttonslider'>
                                                        <Button link={item.uri} text="Read More" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                    : null
                            }
                        </Swiper> : null
                    }
                    <div className="sliderNextPrev">
                        <div onClick={() => swiperRef.current?.slidePrev()}><FontAwesomeIcon icon={faArrowLeft} /></div>
                        <div onClick={() => swiperRef.current?.slideNext()}><FontAwesomeIcon icon={faArrowRight} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
