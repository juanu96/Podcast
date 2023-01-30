import React from 'react'
import Menu from '../../Components/Menu/Menu'
import Footer from "../../Components/Footer/Footer";
import { Outlet } from 'react-router-dom';

export default function index() {
    return (
        <>
            <Menu />
            <Outlet />
            <Footer />
        </>
    )
}
