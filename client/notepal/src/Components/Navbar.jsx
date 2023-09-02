import React,{useContext,useState,useEffect} from 'react'
import "./Navbar.css"
import Navigation from '../UI/Navigation'
import {MdAccountCircle} from "react-icons/md";
import {TiThMenu} from 'react-icons/ti';


const Navbar = (props) => {

  const username = sessionStorage.getItem('username');
  console.log('username',username)

  return (
    <div className='navbar'>
        <div className='navbar_inner'>
            <div className='n-left'>
              <span className='destopOnly'>
              <span className="n-logo">NOTEpal</span>
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
              {username ?
                (<div className="n-avatar">
                <MdAccountCircle/>
                <span>Welcome {username}!</span>
                </div>): 
                (<p>Please log in</p>)
              }
            </span>
        </div>

    </div>
  )
}

export default Navbar
