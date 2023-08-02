import React, {useContext, useState, useEffect}from 'react';
import MyContext from '../context/StateContext';
import './NoteDetail.css';
import { useLocation, Link } from 'react-router-dom';
import {BiArrowBack} from "react-icons/bi"
import{CiBookmark,CiBookmarkPlus,CiBookmarkCheck,CiShare1,CiStop1,CiSquareRemove} from "react-icons/ci"
import {BiCopyAlt} from "react-icons/bi";
import moment from "moment";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';



const NoteDetail = () => {

  const [modal, setModal] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();
     // Extract the ID from the pathname
  const pathname = location.pathname;
  const id = pathname.substring(pathname.lastIndexOf('/') + 1); // Assuming the ID is the part of the pathname following the first character

  const {notes, getNotes,loading,error,updateNotesAfterDeletion} = useContext(MyContext);
  const filteredNote = notes.filter(note => note._id === id);
 // Extract and calculate hours for each filtered note
 
 const timeDiff = filteredNote.map(item=>{
    const currentTime = moment();
    const postTime = moment.utc(item.dateSubmit).local();
    const diffInMinutes = currentTime.diff(postTime, 'minutes');
    
    if (diffInMinutes < 1) {
      return 'just now';
    } else if (diffInMinutes === 1) {
      return '1 minute ago';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) { // less than 24 hours
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
 })

const handleDelete=(e)=>{
  axios.delete(`http://localhost:8800/notes/${id}`)
  .then(response => {
    console.log('Post deleted successfully');
    updateNotesAfterDeletion(id)
    navigate('/allNotes');
  })
  .catch(error => {
    console.error('Error deleting post:', error);
  });
}

const handleUpdate= async (e)=>{
  e.preventDefault();
  setModal(true);
  console.log(modal+"clicked")
}

  const handleDataFromChild =(modRes)=>{
  if(modRes){
      setModal(false)
    }
  }

  return (
    <div className='NoteDetail'>
      {<Modal clicked={modal} sendDataToParent={handleDataFromChild} title={filteredNote.map(item=>item.title)} message={filteredNote.map(item=>item.message)}/>}
      <div className='NoteDetail_inner'>
          <div className='NoteDetail_inner_header'>
            <span><h3>{filteredNote.map(item=>item.title)}</h3></span>
            <span>Added <b>{timeDiff}</b></span>
          </div>

          <div className='NoteDetail_inner_main'>
          {filteredNote.map(item=>item.image)}
            {filteredNote.map(item=>item.message)}
          </div>

          <div className='NoteDetail_inner_header'>
            <Link to="/allNotes"><span className='button'><button>Go back</button> <BiArrowBack /> </span></Link>
            <div className='options'>
              <span><CiShare1/></span>
              <span onClick={handleUpdate}><CiBookmarkPlus/></span>
              <span><BiCopyAlt/></span>
              <span onClick={handleDelete}><CiSquareRemove/></span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default NoteDetail