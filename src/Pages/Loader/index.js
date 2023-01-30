import React from 'react'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import lottie from '../../json/LoadPodcast.json'
export default function index() {
  return (
    <Player
          autoplay
          loop
          src={lottie}
          style={{ height: "300px", width: "300px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
  )
}
