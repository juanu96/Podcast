import React from 'react'
import { gql, useQuery } from "@apollo/client";
import '././Gallery.scss'
import { GALLERY } from "../GraphQL"


export default function Gallery() {
  const { loading, data } = useQuery(GALLERY);

  return (
    <div className='gallerySection'>
      <div className='galleryrow'>
        <h2
          data-aos="fade-up"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true">{!loading ? data.pages.edges[0].node.gallery.title : null}</h2>
        <div className='gallerygrid'>
          {
            !loading ? data?.pages?.edges[0]?.node?.gallery?.gallery?.map((item, index) => {
              return (
                <img data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true" key={index} className={`item ${'col-' + index}`} src={item.mediaItemUrl} alt={item.title} />
              );
            }) : null
          }
        </div>
      </div>
    </div>
  )
}
