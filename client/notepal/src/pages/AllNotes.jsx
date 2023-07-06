import React,{useContext,useState} from 'react';

import MyContext  from '../context/StateContext';
import './AllNotes.css';
import {Link} from 'react-router-dom';


const AllNotes = () => {

const {notes, getNotes,loading,error} = useContext(MyContext);

const afterEffects=()=>{
    if(loading){
        return <p> Loading</p>
    }else if(notes.length === null || notes.length === undefined ){
        return <p>You dont have any notes</p>
    }
    else if(error){
        return <p>{error.message}</p>
    }else{
      return <p>Please refresh this page!</p>
    }
}
    
  return (
    <div className='AllNotes'>
      <div className='AllNotes_inner'>
        {
            notes.length?notes.map((item)=>{
                return(
                  <Link to={`/allNotes/${item._id}`} key={item.id} style={{ textDecoration: 'none', color: 'white', }}>
                    <div className='note_item'key={item.id}>
                    <span className='note_item_header'>
                        <span className='note_item_header_left'> choose</span>
                        <span className='note_item_header_right'>close</span>
                    </span>
    
                    <div className='note_item_title'> <h3>{item.title}</h3></div>
                    <div className='note_item_desc'> <p>{item.message}</p></div>
                    </div>
                  </Link>
                  
                )
            }):(<span className='afterEffects'>{afterEffects()}</span>)
        }
      </div>
    </div>
  )
}

export default AllNotes
