import React from 'react'
import { useQuery } from "@apollo/client";
import { MENU, RECENTPODCASTS, FOOTER } from '../GraphQL'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram, faLinkedinIn, faSkype } from "@fortawesome/free-brands-svg-icons"
import './Footer.scss'


export default function Footer() {

    const { loading, data } = useQuery(FOOTER);
    const { loading: pagesLoading, data: pagesData } = useQuery(MENU)
    const { loading: recentPodcastLoading, data: recentPodcastData } = useQuery(RECENTPODCASTS)
    let icons = data?.acfOptionsGlobalOptions?.footer?.footersection?.socialIcons;

    return (
        <div className='footer'>
            <div className='footerrow'>
                <div className='footercontent'>
                    <div className='col-span-1 colum-footer'>
                        <img src={!loading ? data.acfOptionsGlobalOptions.footer.footersection.logo.mediaItemUrl : null} alt='logo' />
                        <p className='content-logo'>{!loading ? data.acfOptionsGlobalOptions.footer.footersection.history : null}</p>
                        <div className='socialIcon'>
                            {
                                icons?.facebook ? <a href={icons.facebook} target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a> : null
                            }
                            {
                                icons?.linkdin ? <a href={icons.linkdin} target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a> : null
                            }
                            {
                                icons?.instagram ? <a href={icons.instagram} target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a> : null
                            }
                            {
                                icons?.skype ? <a href={icons.skype} target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faSkype} />
                                </a> : null
                            }

                        </div>
                    </div>
                    <div className='col-span-1 colum-footer'>
                        <h3 className='titlefooter'>Pages</h3>
                        <ul>
                            {
                                !pagesLoading ? pagesData.menus.nodes[0].menuItems.nodes.map((item, index) => {
                                    return (
                                        <li className='itemfooter' key={index}>
                                            <a href={item.uri}>{item.label}</a>
                                        </li>
                                    );
                                }) : null
                            }
                        </ul>
                    </div>
                    <div className='col-span-1 colum-footer'>
                        <h3 className='titlefooter'>Recent Episodes</h3>
                        <ul>
                            {
                                !recentPodcastLoading ? recentPodcastData.podcasts.nodes.map((item, index) => {
                                    return (
                                        <li className='itemfooter' key={index}>
                                            <a href={item.uri}>{item.title}</a>
                                        </li>
                                    );
                                }) : null
                            }
                        </ul>
                    </div>
                    <div className='col-span-1 colum-footer'>
                        <h3 className='titlefooter'>Listen My Podcasts Also In</h3>
                        <ul>
                            {
                                !loading ? data?.acfOptionsGlobalOptions?.footer?.footersection?.listenonpodcast?.map((item, index) => {
                                    return (
                                        <li className='podcastlogo' key={index}>
                                            <a href={item.url}>
                                                <img src={item.logo.mediaItemUrl} alt="" />
                                            </a>
                                        </li>
                                    )
                                }) : null
                            }
                        </ul>
                    </div>
                </div>
                <div className='Rights'>
                    <p>@2022 <a href='https://nicasource.com/' target="_blank" rel='noreferrer'>NicaSource</a> All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}
