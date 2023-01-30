import React from 'react'
import notFound from '../../json/notFound.json'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Button from '../../Components/Elements/Button';
import './NoPage.scss'
export default function index() {
  return (
    <div className='notfoundSection'>
      <div className='notfoundRow'>
        <Player
          autoplay
          loop
          src={notFound}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
        <div className='button'>
          <Button link="/" text="Go To Home" />
        </div>
      </div>
    </div>
  )
}
