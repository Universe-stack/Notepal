import React,{useState} from 'react';
import Navbar from '../Components/Navbar';
import "./Home.css";
import {AiOutlineFileAdd} from "react-icons/ai";
import Modal from '../UI/Modal/Modal';
import Notebox from '../UI/notebox/notebox';
import * as Form from '@radix-ui/react-form';



const Home = (props) => {

  const [modal, setModal] = useState(false);
  const [show, setShow] =useState(false);
  const [loggedIn, setLoggedIn] =useState(false);

  const handleOpenModal = () => {
    setModal(true);
    console.log(modal+"clicked")
  };

  const handleDataFromChild =(data)=>{
    if(data){
      setModal(false)
    }
  }
  
  let attachedClasses=['Modal','Close'].join(' ');
  if(show){
      attachedClasses=['Modal','Open'].join(' ');
  }
  const handleShow = () => {
    setShow(!setShow); // Toggle the state value
  };

  const handleLogin=()=> {
    setShow(true)
  }

  const handleLogout=()=> {
  
  }

  let loginClasses=['buttons','Open'].join(' ');
  if(loggedIn){
      loginClasses=['buttons','Close'].join(' ');
  }

  let logoutClasses=['buttons','Close'].join(' ');
  if(loggedIn){
      logoutClasses=['buttons','Open'].join(' ');
  }

  return (
    <div className='Home'>
      {<Modal clicked={modal} sendDataToParent={handleDataFromChild}/>}
      <div className='Home_inner'>
        <aside className='Home_inner_aside'>
          
          <span className='Home_inner_top'>
            <div className='h-logo'>
              LOGO
            </div>
            <ul>
              <li onClick={handleOpenModal}> ADD NOTE</li>
              <li><a href='http://localhost:5173/allNotes'>ALL NOTES</a></li>
              <li> DELETE ALL</li>
            </ul>
          </span>
          
          <div className='Logout'>
            <button onClick={handleLogin} className={loginClasses}><h3>LOGIN</h3></button> 
            <button onClick={handleLogout}className={logoutClasses}><h3>LOGOUT</h3></button>
          </div>
        </aside>

        <main className='Home_inner_main'>
          <div className='Home_inner_main_left'>
              <div className='add_note'>
                <div className='add'>
                    <AiOutlineFileAdd />
                    <p>Create new document</p>
                </div>
              </div>
              {/* This is for the authentication modal */}
              <div className ={attachedClasses}>
                  <Form.Root className="FormRoot">
                    <Form.Field className="FormField" name="email">
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Name</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your name
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className="Input" type="email" required />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field className="FormField" name="email">
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Email</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your email
                        </Form.Message>
                        <Form.Message className="FormMessage" match="typeMismatch">
                          Please provide a valid email
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className="Input" type="email" required />
                      </Form.Control>
                    </Form.Field>
                    <Form.Field className="FormField" name="email">
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Email</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your password
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className="Input" type="email" required />
                      </Form.Control>
                    </Form.Field>
                    <Form.Submit asChild>
                      <button className="Button" style={{ marginTop: 10 }}>
                        Login
                      </button>
                    </Form.Submit>
                  </Form.Root>
              </div>

              <div className='view_notes'>
                <Notebox />
              </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
