import React, { useContext, useEffect, useState, useLayoutEffect } from 'react'
import { useQuery } from "@apollo/client";
import { ITEMSMENU, MENU } from '../GraphQL';
import { Store } from '../../App';
import MobileMenu from './MobileMenu';
import './Menu.scss'

export default function Menu() {

    const store = useContext(Store)
    const [menu, setMenu] = useState(null)
    const [menuItems, setMenuItems] = useState(null)
    const [size, setSize] = useState(null);

    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const { loading: itemsloading, data: itemsdata } = useQuery(ITEMSMENU, {
        onCompleted: (data) => {
            setMenuItems(data)
        }
    });
    const { loading: menuloading, data: menudata } = useQuery(MENU, {
        onCompleted: (data) => {
            setMenu(data)
        }
    });

    useEffect(() => {
        store.setLoadingItemsMenu(menuItems)
        store.setLoadingMenu(menu)
    }, [menuItems, menu])

    return (
        <>
            {
                menu && size > 980 ? <div className='menuSection'
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true">
                    <div className='menuRow menuDesktop'>
                        {!itemsloading ?
                            <a href='/'><img className='justify-self-start' src={itemsdata.acfOptionsGlobalOptions.menu.menu.logo.mediaItemUrl} alt='NicaSource' /></a>
                            : null}
                        <ul className='grid grid-flow-col w-full'>
                            {
                                !menuloading ?
                                    menudata.menus.nodes[0].menuItems.nodes.map((item, key) => {
                                        return (
                                            <li key={key}>
                                                <a href={item.uri}>{item.label}</a>
                                            </li>
                                        )
                                    })
                                    : null
                            }
                        </ul>

                        <div className='buttonsMenu'>
                            {
                                !itemsloading ?
                                    itemsdata.acfOptionsGlobalOptions.menu.menu.button.map((item, index) => {
                                        return (
                                            <a key={index} href={item.url} className={`bg-primary hover:bg-white hover:text-primary text-white px-8 py-2 rounded border-primary border-solid border-2 ${index === 0 ? 'suscribe' : null}`}>{item.text}</a>
                                        )
                                    })
                                    : null
                            }
                        </div>
                    </div>
                </div> : menu && size < 980 ?
                    <div className='menuSection'>
                        <div className='menuRow'>
                            <MobileMenu buttons={itemsdata?.acfOptionsGlobalOptions?.menu?.menu?.button} menu={menudata?.menus?.nodes[0]?.menuItems?.nodes} logo={itemsdata?.acfOptionsGlobalOptions?.menu?.menu?.logo?.mediaItemUrl} />
                        </div>
                    </div>
                    : null}
        </>
    )
}
