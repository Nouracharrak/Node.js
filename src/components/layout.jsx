import React from 'react'

// les composants
import Header from './header'
import { Outlet } from 'react-router-dom'
import Footer from './footer'

const Layout = () => {
  return (

      <main>
        <Header/>
        <hr/>
        <div>
        <Outlet/>
        </div>
        <Footer/>
      </main>
  )
}

export default Layout