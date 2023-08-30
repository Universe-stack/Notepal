import React,{useState,useEffect} from 'react';
const Navbar = React.lazy(() => import('../Components/Navbar'));
import "./Home.css";
import {AiOutlineFileAdd} from "react-icons/ai";
const Modal = React.lazy(() => import('../UI/Modal/Modal'));
const Notebox = React.lazy(() => import('../UI/notebox/Notebox'));
import * as Form from '@radix-ui/react-form';
const Backdrop = React.lazy(() => import('../UI/Backdrop/Backdrop'));
import axios from "axios";



const Home = (props) => {

  {/** For modal operations */}
  const [modal, setModal] = useState(false);
  const [show, setShow] =useState(false);
  const [loggedIn, setLoggedIn] =useState(false);

  {/** For sending collecting and sending data to the server */}
  const [formData, setFormData] = useState({username:"",useremail:"", userpassword:""});

  useEffect(() => {
      // Load the token from storage when the component mounts
      const token = sessionStorage.getItem('jwtToken');
      token?setLoggedIn(true):setLoggedIn(false)
  }, []);

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

  const handleClick=()=>{
    setShow(false)
  }

  const handleLogin=()=> {
    setShow(true)
  }

  const handleLogout=()=> {
  
  }

  const handleRegister=(e)=> {

    e.preventDefault();

    const requestData = {
      username: formData.username,
      email: formData.useremail,
      isAdmin: true,
      password: formData.userpassword
    };
  
    // Send the data to the backend using axios
    axios.post('http://localhost:8800/auth/register', requestData)
  .then(response => {
    console.log(response);

    if (response.status === 201) {
      const token = response.data.token;

      // Store the token in sessionStorage
      sessionStorage.setItem('jwtToken', token);

      console.log('Registration was successful!');
      // Example: Clear the form fields after successful registration
      setFormData({ username: '', useremail: '', userpassword: '' });
    } else {
      console.log('Registration failed:', response.data.message);
      // Handle the case where the backend indicates a failed registration
    }
  })
  .catch(error => {
    console.error('Error during registration:', error);
    // Handle errors here
  });

  }

  let loginClasses=['buttons','Open'].join(' ');
  if(loggedIn){
      loginClasses=['buttons','Close'].join(' ');
  }

  let logoutClasses=['buttons','Close'].join(' ');
  if(loggedIn){
      logoutClasses=['buttons','Open'].join(' ');
  }

  {/** Handling functions for input change */}
  const handleInputChange =(e)=>{
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })

    console.log(formData,"this is formdata")
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
              <li><a href='http://localhost:5173/allNote'>ALL NOTES</a></li>
              <li> DELETE ALL</li>
            </ul>
          </span>

          <div className='Logout'>
           
            <button onClick={handleLogout} className={logoutClasses}>
              <h3>LOGOUT</h3>
            </button>
            <button onClick={() => setShow(true)} className={loginClasses}>
              <h3>REGISTER</h3>
            </button>
            <button onClick={handleLogin} className={loginClasses}>
                <h3>LOGIN</h3>
            </button>
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
              {show ? <Backdrop /> : null}
              <div className ={attachedClasses}>
              <span className='btn_Close'><button onClick={handleClick}>X</button></span>
                  <Form.Root className="FormRoot" onSubmit={handleRegister}>
                    <Form.Field className="FormField" name="username">
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Name</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your name
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className="Input" type="text" required  name="username" value={formData.username} onChange={handleInputChange}/>
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
                        <input className="Input" type="email" required name="useremail" value={formData.useremail} onChange={handleInputChange}/>
                      </Form.Control>
                    </Form.Field>
                    <Form.Field className="FormField" name="password">
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Password</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                          Please enter your password
                        </Form.Message>
                      </div>
                      <Form.Control asChild>
                        <input className="Input" type="text" required name="userpassword" value={formData.password} onChange={handleInputChange}/>
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
