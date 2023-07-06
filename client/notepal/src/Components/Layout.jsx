import React from 'react'
import Navbar from './Navbar'

const Layout = (props) => {
  return (
    <div className='Layout'>
      <Navbar />
      <div>
        <main>
            {props.children}
        </main>
      </div>
    </div>
  )
}

export default Layout;
