import React from 'react'
import HeroSection from "../../Components/HeroSection/HeroSection";
import PodcastSection from "../../Components/PodcastSection/PodcastSection";
import Gallery from "../../Components/Gallery/Gallery";
import Subscribe from "../../Components/Subscribe/Subscribe";
import PostSlider from "../../Components/PostSlider/PostSlider";

export default function index() {
    return (
        <>
            <HeroSection />
            <PodcastSection />
            <PostSlider />
            <Gallery />
            <Subscribe />
        </>
    )
}
