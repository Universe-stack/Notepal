import React from 'react'
import "./Navbar.css"
import Navigation from '../UI/Navigation'
import {MdAccountCircle} from "react-icons/md";
import {TiThMenu} from 'react-icons/ti'

const Navbar = (props) => {
  return (
    <div className='navbar'>
        <div className='navbar_inner'>
            <div className='n-left'>
              <span className='destopOnly'>
              <span className="n-logo">LOGO</span>
              </span>
              
              <span className='desktop_only'>
              <TiThMenu />
              </span>
            </div>
            
            <div className='destopOnly'>
              <span className="n-center">
                  <Navigation />
              </span>
            </div>
            

            <span className="n-right">
                <div className="n-avatar">
                <MdAccountCircle/>
                </div>
            </span>
        </div>

    </div>
  )
}

export default Navbar
