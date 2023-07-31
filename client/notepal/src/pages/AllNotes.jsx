import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/StateContext';
import './AllNotes.css';
import { Link,useNavigate } from 'react-router-dom';
import { AiOutlineMore } from 'react-icons/ai';
import { BiCheckbox, BiCheckboxChecked, BiTrash } from 'react-icons/bi';
import DropdownMenuDemo from '../UI/Dropodown/Dropdown.jsx';
import axios from 'axios'

const AllNotes = (props) => {

  const navigate = useNavigate();

  const { notes, getNotes, loading, error, updateNotesAfterDeletion,updateNotesAfterDeletions } = useContext(MyContext);
  const [checked, setChecked] = useState([]);

  const handleToggleCheck = (id) => {
    setChecked((prevChecked) => {
      if (prevChecked.includes(id)) {
        return prevChecked.filter((checkedId) => checkedId !== id);
      } else {
        return [...prevChecked, id];
      }
    });
  };

  useEffect(() => {
    console.log("Notes updated:", notes);
  }, [notes]);

  const handleDeleteSelected = async () => {
    // Perform the deletion logic using the checked array to get the IDs of the selected notes
    // For example:
    // deleteSelectedNotes(checked);
    // The deleteSelectedNotes function should perform the API call to delete the selected notes
    // After successful deletion, you can update the notes using updateNotesAfterDeletion function
    // updateNotesAfterDeletion(checked);

      // Replace 'apiEndpoint' with the actual API endpoint for deleting notes
      //const apiEndpoint = 'http://localhost:8800/api/notes';
    
      // Make an API call to delete the selected notes using the IDs in the 'checked' array
      
      await axios.delete(`http://localhost:8800/notes/checked`, {
          data: { ids: checked }, // Assuming your API accepts an object with an 'ids' property containing an array of IDs to delete
        })
        .then((response) => {
          // Check if the response indicates successful deletion
          if (response.status === 200) {
            // Deletion was successful, update the notes on the client-side
            updateNotesAfterDeletions(checked);
            setChecked([]);
            navigate('/allNotes');
          } else {
            throw new Error('Failed to delete notes');
          }
        })
        .catch((error) => {
          console.error('Error deleting notes:', error);
        });
  };

  const afterEffects = () => {
    // ... Existing afterEffects function code ...
  };

  return (
    <div className='AllNotes'>
       {checked.length > 0 && (
              <div className='delete-selected'>
                <BiTrash onClick={handleDeleteSelected} />
              </div>
            )}
      <div className='AllNotes_inner'>
        {notes.length ? (
          <>
            {notes.map((item) => (
              <div className='note_item' key={item.id}>
                <span className='note_item_header'>
                  <span className='note_item_header_left'>
                    {checked.includes(item._id) ? (
                      <BiCheckboxChecked onClick={() => handleToggleCheck(item._id)} />
                    ) : (
                      <BiCheckbox onClick={() => handleToggleCheck(item._id)} />
                    )}
                  </span>
                  <span className='note_item_header_right'>
                    <DropdownMenuDemo dropdownIcon={<AiOutlineMore />} divId={item._id} />
                  </span>
                </span>
                <Link to={`/allNotes/${item._id}`} key={item.id} style={{ textDecoration: 'none', color: 'white' }}>
                  <div className='note_item_title'>
                    <h3>{item.title}</h3>
                  </div>
                  <div className='note_item_desc'>
                    <p>{item.message}</p>
                  </div>
                </Link>
              </div>
            ))}
           
          </>
        ) : (
          <span className='afterEffects'>{afterEffects()}</span>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
