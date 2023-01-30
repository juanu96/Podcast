import React, { createContext, useState, Suspense, useEffect } from "react";
//import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Post from './Pages/Post/Post'
import Podcast from './Pages/Podcast/Podcast'
import NoPage from './Pages/NoPage'
import Loader from './Pages/Loader'
import { Route, Routes } from "react-router-dom"
import 'aos/dist/aos.css';
import AOS from 'aos';
AOS.init({ once: true });
const Home = React.lazy(() => import('./Pages/Home'));
export const Store = createContext(null);

function App() {
  const [menuLinks, setMenuLinks] = useState();
  const [currentPage, setCurrentPage] = useState(null)
  const [loadingItemsMenu, setLoadingItemsMenu] = useState(true)
  const [loadingMenu, setLoadingMenu] = useState(true)
  const [loadingHero, setLoadingHero] = useState([])

  return (


    <Store.Provider
      value={
        {
          menuLinks,
          setMenuLinks,
          currentPage,
          setCurrentPage,
          loadingItemsMenu,
          setLoadingItemsMenu,
          loadingMenu,
          setLoadingMenu,
          loadingHero,
          setLoadingHero
        }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/blog/:slug" element={<Post />} />
          <Route exact path="/blog/podcast/:slug" element={<Podcast />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Store.Provider>
  )
}


export default App
