import React,{useState} from 'react';
import Navbar from '../Components/Navbar';
import "./Home.css";
import {AiOutlineFileAdd} from "react-icons/ai";
import Modal from '../UI/Modal/Modal';
import Notebox from '../UI/notebox/notebox';


const Home = (props) => {

  const [modal, setModal] = useState(false)

  const handleOpenModal = () => {
    setModal(true);
    console.log(modal+"clicked")
  };

  const handleDataFromChild =(data)=>{
    if(data){
      setModal(false)
    }
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
          
          <span className='Logout'>
            <button><h3>LOGOUT</h3></button>
          </span>
        </aside>

        <main className='Home_inner_main'>
          <div className='Home_inner_main_left'>
              <div className='add_note'>
                <div className='add'>
                    <AiOutlineFileAdd />
                    <p>Create new document</p>
                </div>
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
