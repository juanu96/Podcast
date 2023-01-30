import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
export default function MobileMenu(...props) {
    const [menuOpen, setMenuOpen] = useState(null)
    return (
        <>
            <div id="mobileMenu" className={`${menuOpen ? 'menuOpen ' : ''}overlay`}>
                <p className="closebtn" onClick={() => setMenuOpen(false)}><FontAwesomeIcon icon={faXmark} /></p>
                <div className="overlay-content">
                    {
                        props[0].menu.map((item, key) => {
                            return (
                                <a key={key} href={item.uri}>{item.label}</a>
                            )
                        })
                    }
                </div>
                <div className='buttonsMenu'>
                    {
                        props[0].buttons.map((item, index) => {
                            return (
                                <a key={index} href={item.url} className={`bg-primary hover:bg-white hover:text-primary text-white px-8 py-2 rounded border-primary border-solid border-2 ${index === 0 ? 'suscribe' : null}`}>{item.text}</a>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mobileMenuContent'>
                <img className='justify-self-start' src={props[0].logo} alt='NicaSource' />
                <span className='menuIcon' onClick={() => setMenuOpen(true)}><FontAwesomeIcon icon={faBars} /></span>
            </div>
        </>
    )
}
