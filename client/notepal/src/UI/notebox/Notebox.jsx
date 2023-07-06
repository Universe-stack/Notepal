import React ,{useContext}from 'react';
import './Notebox.css';
import MyContext from '../../context/StateContext';

const Notebox = () => {

    const {note} = useContext(MyContext)
  return (
    <div className='Notebox'>
      {note.map(item=>{
        return(
            <div className='note_item' key={item.id}>
                <span className='note_item_header'>
                    <span className='note_item_header_left'> left</span>
                    <span className='note_item_header_right'>right</span>
                </span>

                <div className='note_item_title'> <h3>{item.title}</h3></div>
                <div className='note_item_title'> <p>{item.message}</p></div>
            </div>
        )

      })}
    </div>
  )
}

export default Notebox
